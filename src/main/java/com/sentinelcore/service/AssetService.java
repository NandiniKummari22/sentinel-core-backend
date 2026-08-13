package com.sentinelcore.service;

import java.util.List;
import java.util.stream.Collectors;
import com.sentinelcore.dto.AssetDTO;
import com.sentinelcore.Entity.Asset;
import com.sentinelcore.repository.AssetRepository;
import org.springframework.stereotype.Service;
import com.sentinelcore.dto.DashboardSummaryDTO;


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
                .assetType(assetDTO.getAssetType())
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
    
    public DashboardSummaryDTO getDashboardSummary(){
        List<Asset> all =assetRepository.findAll();
        long total=all.size();
        long online=all.stream().filter(a->"ONLINE".equals(a.getStatus()))
                    .count();
        long offline=all.stream().filter(a->"OFFLINE".equals(a.getStatus()))
                    .count();
        long critical=all.stream().filter(a->"CRITICAL".equals(a.getStatus()))
                    .count();
        double avgCpu=all.stream().filter(a->a!=null && a.getCpu_usage()!=null).mapToDouble(a->a.getCpu_usage()).average().orElse(0);
        double avgMem=all.stream().filter(a->a!=null && a.getMemory_usage()!=null).mapToDouble(a->a.getMemory_usage()).average().orElse(0);
        double uptime=total==0?0:(double)online/total*100;

        return DashboardSummaryDTO.builder()
            .totalAssets(total)
            .uptimePercentage(uptime)
            .onlineAssets(online)
            .offlineAssets(offline)
            .criticalAlerts(critical)
            .avgCpuUsage(avgCpu)
            .avgMemoryUsage(avgMem)
            .build();
    }

    private AssetDTO toDTO(Asset asset){
        return AssetDTO.builder()
                .id(asset.getId())
                .asset_name(asset.getAsset_name())
                .assetType(asset.getAssetType())
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
