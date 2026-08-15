package com.sentinelcore.service;

import com.sentinelcore.Entity.Asset;
import com.sentinelcore.repository.AssetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HealthMonitoringService {
    private final AssetRepository assetRepository;
    private final AlertService alertService;

    private static final double CPU_CRITICAL_THRESHOLD=90.0;
    private static final double MEMORY_WARNING_THRESHOLD=80.0;

    @Scheduled(fixedRate = 60000) // Run every minute
    public void checkAssetsHealth() {
        List<Asset> assets = assetRepository.findAll();
        for (Asset asset : assets) {
            if (asset.getCpu_usage()!=null && asset.getCpu_usage() >= CPU_CRITICAL_THRESHOLD) {
                asset.setStatus("CRITICAL");
                alertService.createAlert(asset.getId(), "CRITICAL" , "CPU usage critical: " + asset.getCpu_usage());
            } else if (asset.getMemory_usage() !=null && asset.getMemory_usage() >= MEMORY_WARNING_THRESHOLD) {
                asset.setStatus("WARNING");
                alertService.createAlert(asset.getId(), "MEDIUM" , "Memory usage high: " + asset.getMemory_usage());
            }
            else {
                asset.setStatus("ONLINE");
            }
        }
    }
}