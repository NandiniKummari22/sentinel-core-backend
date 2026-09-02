package com.sentinelcore.service;

import com.sentinelcore.dto.AlertDTO;
import com.sentinelcore.Entity.Alert;
import com.sentinelcore.repository.AlertRepository;
import com.sentinelcore.Entity.Asset;
import com.sentinelcore.repository.AssetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.stream.Collectors;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AlertService {

    private final AssetRepository assetRepository;
    private final AlertRepository alertRepository;
    private final NotificationService notificationService;
    
    public List<AlertDTO> getOpenAlerts() {
        return alertRepository.findByStatus(Alert.AlertStatus.OPEN)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public AlertDTO createAlert(Long assetId, String severity, String message) {
        
        Asset asset = assetRepository.findById(assetId)
            .orElseThrow(() -> new RuntimeException("Asset not found: " + assetId));

        Alert alert=new Alert();
        alert.setAsset(asset);
        alert.setSeverity(Alert.AlertSeverity.valueOf(severity.toUpperCase()));
        alert.setMessage(message);
        alert.setStatus(Alert.AlertStatus.OPEN);

        Alert savedAlert= alertRepository.save(alert);

        if (alert.getSeverity() == Alert.AlertSeverity.CRITICAL ||
        alert.getSeverity() == Alert.AlertSeverity.HIGH) {
        notificationService.sendAlertEmail(
            "ops-team@sentinelcore.local",
            asset.getAsset_name(),
            alert.getSeverity().name(),
            alert.getMessage()
            );
        }
        return toDTO(savedAlert);
    }

    public AlertDTO resolveAlert(Long alertId) {
        Alert alert = alertRepository.findById(alertId)
                .orElseThrow(() -> new RuntimeException("Alert not found with id: " + alertId));
        alert.setStatus(Alert.AlertStatus.RESOLVED);
        alert.setResolvedAt(LocalDateTime.now());
        return toDTO(alertRepository.save(alert));
    }

    private AlertDTO toDTO(Alert alert) {
        return AlertDTO.builder()
            .id(alert.getId())
            .assetId(alert.getAsset().getId())
            .assetName(alert.getAsset().getAsset_name())
            .message(alert.getMessage())
            .severity(alert.getSeverity().name())
            .status(alert.getStatus().name())
            .createdAt(alert.getCreatedAt())
            .resolvedAt(alert.getResolvedAt())
            .build();
    }
}
