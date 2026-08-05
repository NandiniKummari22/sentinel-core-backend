package com.sentinelcore.dto;

import lombok.Data;
import lombok.Builder;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonProperty;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AssetDTO {
    
    private Long id;

    @JsonProperty("asset_name")
    private String asset_name;

    @JsonProperty("asset_type")
    private String asset_type;

    @JsonProperty("status")
    private String status;
    
    @JsonProperty("location")
    private String location;

    @JsonProperty("ip_address")
    private String ip_address;
    
    @JsonProperty("cpu_usage")
    private String cpu_usage;

    @JsonProperty("memory_usage")
    private String memory_usage;

    @JsonProperty("disk_usage")
    private String disk_usage;
    
    @JsonProperty("network_usage")
    private String network_usage;
    
    @JsonProperty("last_date")
    private String last_date;

    public String getAsset_name() {
        return asset_name;
    }
    public String getStatus() {
        return status;
    }
    public String getAsset_type() {
        return asset_type;
    }
    public String getIp_address() {
        return ip_address;
    }   
    public String getLocation() {
        return location;
    }
    public String getCpu_usage() {
        return cpu_usage;
    }
    public String getDisk_usage() {
        return disk_usage;
    }
    public String getMemory_usage() {
        return memory_usage;
    }
    public String getNetwork_usage() {
        return network_usage;
    }
    public String getLast_date() {
        return last_date;
    }
    
}
