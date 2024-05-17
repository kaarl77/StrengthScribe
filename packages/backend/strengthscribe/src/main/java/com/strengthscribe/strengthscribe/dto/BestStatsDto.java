package com.strengthscribe.strengthscribe.dto;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Data
public class BestStatsDto {
    private Long exerciseId;
    private String exerciseName;
    private Long overLast;
    private String progressWent;
    private Float progressValue;
    private Float progressPercentage;
    private Map<LocalDate, List<SetRegisterDto>> records;
}
