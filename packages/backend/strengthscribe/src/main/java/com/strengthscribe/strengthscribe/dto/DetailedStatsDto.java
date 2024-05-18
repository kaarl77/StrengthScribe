package com.strengthscribe.strengthscribe.dto;

import lombok.Data;

@Data
public class DetailedStatsDto {
    private Float pr;
    private BestStatsDto summaryStats;
    private RecentRecordDto recentStats;
}
