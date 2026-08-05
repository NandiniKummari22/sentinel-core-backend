package com.sentinelcore.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id; 
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import jakarta.persistence.Column;

@Entity
@Table(name = "assets")
@Data
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Asset {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "asset_name", nullable = false)
    private String asset_name;

    @Column(name = "asset_type", nullable = false)
    private String asset_type;

    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "location", nullable = false)  
    private String location;

    @Column(name = "ip_address", nullable = false)
    private String ip_address;

    @Column(name = "cpu_usage", nullable = false)
    private String cpu_usage;

    @Column(name = "memory_usage", nullable = false)
    private String memory_usage;

    @Column(name = "disk_usage", nullable = false)
    private String disk_usage;

    @Column(name = "network_usage", nullable = false)
    private String network_usage;

    @Column(name = "last_date")
    private String last_date;

}