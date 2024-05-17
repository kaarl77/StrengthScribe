package com.strengthscribe.strengthscribe.dto;

import lombok.Data;

@Data
public class RecentRecordDto {
    private Integer numberOfSets;

    private Float avgReps;

    private Integer maxReps;

    private Float avgWeight;

    private Float maxWeight;
}
