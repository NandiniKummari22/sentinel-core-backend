package com.sentinelcore.controller;

import java.util.List;
import org.springframework.web.bind.annotation.RestController;
import com.sentinelcore.dto.AssetDTO;
import com.sentinelcore.dto.DashboardSummaryDTO;
import com.sentinelcore.service.AssetService;
import com.sentinelcore.Entity.Asset;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/assets")
@PreAuthorize("hasRole('ADMIN')")
@CrossOrigin(origins = "http://localhost:5173")
public class AssetController {

    private final AssetService assetService;

    AssetController(AssetService assetService) {
        this.assetService = assetService;
    }

    @GetMapping("/id/{id}")
    public AssetDTO getAssetById(@PathVariable Long id) {
        return assetService.getAssetById(id);
    }

    @GetMapping
    public List<AssetDTO> getAllAssets() {
        return assetService.getAllAssets();
    }   

    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public AssetDTO createAsset(@RequestBody AssetDTO dto) {
        return assetService.createAsset(dto);
    }

    @GetMapping("/dashboard/summary")
    public DashboardSummaryDTO getDashboardSummary(){
        return assetService.getDashboardSummary();
    }

    @GetMapping("/search")
public ResponseEntity<List<Asset>> searchAssets(
        @RequestParam(required = false) String search,
        @RequestParam(required = false) String status,
        @RequestParam(required = false) String risk) {

    List<Asset> assets = assetService.searchAndFilter(
            search,
            status,
            risk
    );

    return ResponseEntity.ok(assets);
}
}
