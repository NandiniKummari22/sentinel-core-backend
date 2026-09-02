package com.sentinelcore.controller;

import com.sentinelcore.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import com.sentinelcore.Entity.User;
import com.sentinelcore.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> credentials) {

        String username = credentials.get("username");
        String rawPassword = credentials.get("password");
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        String role = user.getRoles()
                .stream()
                .findFirst()
                .map(r -> r.getName())
                .orElseThrow(() -> new RuntimeException("User has no role"));

        String accessToken = jwtUtil.generateToken(username, role);
        String refreshToken = jwtUtil.generateRefreshToken(username, role); // role added

        return Map.of("accessToken", accessToken, "refreshToken", refreshToken);
    }

    @PostMapping("/refresh")
    public Map<String, String> refresh(@RequestBody Map<String, String> body) {

        String refreshToken = body.get("refreshToken");

        if (!jwtUtil.isTokenValid(refreshToken)) {
            throw new RuntimeException("Invalid or expired refresh token");
        }

        String username = jwtUtil.extractUsername(refreshToken);
        String role = jwtUtil.extractRole(refreshToken);

        String newAccessToken = jwtUtil.generateToken(username, role);

        return Map.of("accessToken", newAccessToken);
    }
}