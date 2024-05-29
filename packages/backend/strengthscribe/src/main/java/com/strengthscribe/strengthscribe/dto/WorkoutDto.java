package com.strengthscribe.strengthscribe.dto;

import lombok.Data;

import java.util.List;

@Data
public class WorkoutDto {
    private Long id;
    private String name;
    private Long userId;
    private List<ExerciseDto> exercises;
}
