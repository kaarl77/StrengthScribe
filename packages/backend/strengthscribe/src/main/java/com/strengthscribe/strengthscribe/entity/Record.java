package com.strengthscribe.strengthscribe.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Record {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;

    @Column
    private Integer set;

    @Column
    private Integer repetitions;

    @Column
    private Float weight;

    @ManyToOne
    @JoinColumn(name = "exercise_id")
    private Exercise exercise;
}
