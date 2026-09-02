import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [accessToken, setAccessToken] = useState(
        () => localStorage.getItem("accessToken")
    );

    const [refreshToken, setRefreshToken] = useState(
        () => localStorage.getItem("refreshToken")
    );

    const [roles, setRoles] = useState(() => {
        const token = localStorage.getItem("accessToken");
        if (!token) return [];

        try {
            const decoded = jwtDecode(token);
            // Backend sends single "role" claim (string), not "roles" array
            const role = decoded.role;
            return role ? [role.startsWith("ROLE_") ? role : `ROLE_${role}`] : [];
        } catch (error) {
            return [];
        }
    });

    const loginUser = (accessToken, refreshToken) => {
        localStorage.setItem("accessToken", accessToken);

        if (refreshToken) {
            localStorage.setItem("refreshToken", refreshToken);
        }

        setAccessToken(accessToken);
        setRefreshToken(refreshToken);

        try {
            const decoded = jwtDecode(accessToken);
            const role = decoded.role;
            setRoles(role ? [role.startsWith("ROLE_") ? role : `ROLE_${role}`] : []);
        } catch (error) {
            console.error("Invalid JWT token");
            setRoles([]);
        }
    };

    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        setAccessToken(null);
        setRefreshToken(null);
        setRoles([]);
    };

    const isAdmin = roles.includes("ROLE_ADMIN") || roles.includes("ADMIN");

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            setAccessToken(token);
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                accessToken,
                refreshToken,
                roles,
                isAdmin,
                loginUser,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}