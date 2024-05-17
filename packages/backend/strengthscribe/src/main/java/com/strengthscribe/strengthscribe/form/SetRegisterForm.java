package com.strengthscribe.strengthscribe.form;

import lombok.Data;

import java.time.LocalDate;

@Data
public class SetRegisterForm {

    private Integer setNr;

    private Integer repetitions;

    private Float weight;

    private LocalDate registeredAt;

    private Long exerciseId;
}
