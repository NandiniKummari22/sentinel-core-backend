package com.sentinelcore.service;

import java.util.List;
import java.util.stream.Collectors;
import com.sentinelcore.dto.AssetDTO;
import com.sentinelcore.Entity.Asset;
import com.sentinelcore.repository.AssetRepository;
import org.springframework.stereotype.Service;

@Service
public class AssetService {
    
    private final AssetRepository assetRepository;

    AssetService(AssetRepository assetRepository) {
        this.assetRepository = assetRepository;
    }

    public AssetDTO getAssetById(Long id){
        Asset asset=assetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Asset not found"));
        return toDTO(asset);
    }

    public List<AssetDTO> getAllAssets(){
        return assetRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public AssetDTO createAsset(AssetDTO assetDTO) {
        Asset asset = Asset.builder()
                .asset_name(assetDTO.getAsset_name())
                .asset_type(assetDTO.getAsset_type())
                .status(assetDTO.getStatus())
                .location(assetDTO.getLocation())
                .ip_address(assetDTO.getIp_address())
                .cpu_usage(assetDTO.getCpu_usage())
                .memory_usage(assetDTO.getMemory_usage())
                .disk_usage(assetDTO.getDisk_usage())
                .network_usage(assetDTO.getNetwork_usage())
                .last_date(assetDTO.getLast_date())
                .build();
           
        Asset savedAsset = assetRepository.save(asset);
        return toDTO(savedAsset);
    }
    
    private AssetDTO toDTO(Asset asset){
        return AssetDTO.builder()
                .id(asset.getId())
                .asset_name(asset.getAsset_name())
                .asset_type(asset.getAsset_type())
                .status(asset.getStatus())
                .location(asset.getLocation())
                .ip_address(asset.getIp_address())
                .cpu_usage(asset.getCpu_usage())
                .memory_usage(asset.getMemory_usage())
                .disk_usage(asset.getDisk_usage())
                .network_usage(asset.getNetwork_usage())
                .last_date(asset.getLast_date())
                .build();
    }
}
