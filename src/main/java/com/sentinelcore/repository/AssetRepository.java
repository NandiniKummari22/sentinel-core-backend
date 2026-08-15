package com.sentinelcore.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.sentinelcore.Entity.Asset;

public interface AssetRepository extends JpaRepository<Asset, Long> {
    List<Asset> findByStatus(String status);
    List<Asset> findByAssetType(String type);
}