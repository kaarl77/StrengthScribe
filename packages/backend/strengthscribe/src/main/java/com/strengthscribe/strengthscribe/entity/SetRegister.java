package com.strengthscribe.strengthscribe.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
public class SetRegister {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;

    @Column
    private int setNr;

    @Column
    private int repetitions;

    @Column
    private float weight;

    @Column
    private LocalDate registeredAt;

    @ManyToOne
    @JoinColumn(name = "exercise_id")
    private Exercise exercise;
}
