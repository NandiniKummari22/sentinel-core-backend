package com.sentinelcore.controller;

import java.util.List;
import org.springframework.web.bind.annotation.RestController;
import com.sentinelcore.dto.AssetDTO;
import com.sentinelcore.dto.DashboardSummaryDTO;
import com.sentinelcore.service.AssetService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/assets")
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
    public AssetDTO createAsset(@RequestBody AssetDTO assetDTO) {
        System.out.println("Received asset creation request: " + assetDTO);
        return assetService.createAsset(assetDTO);

    }

    @GetMapping("/dashboard/summary")
    public DashboardSummaryDTO getDashboardSummary(){
        return assetService.getDashboardSummary();
    }
}
