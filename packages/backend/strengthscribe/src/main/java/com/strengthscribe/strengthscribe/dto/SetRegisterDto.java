package com.strengthscribe.strengthscribe.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class SetRegisterDto {
    private Long id;

    private Integer setNr;

    private Integer repetitions;

    private Float weight;

    private LocalDate registeredAt;

    private Long exerciseId;
}
