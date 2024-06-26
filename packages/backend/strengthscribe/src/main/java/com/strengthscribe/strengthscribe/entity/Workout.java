package com.strengthscribe.strengthscribe.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Workout {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;

    @Column
    private String name;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
