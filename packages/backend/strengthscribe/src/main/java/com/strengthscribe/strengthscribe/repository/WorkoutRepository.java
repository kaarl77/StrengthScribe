package com.strengthscribe.strengthscribe.repository;

import com.strengthscribe.strengthscribe.entity.User;
import com.strengthscribe.strengthscribe.entity.Workout;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WorkoutRepository extends JpaRepository<Workout, Long> {
    List<Workout> findByUser(User user);

    Workout save(Workout workout);

    void delete(Workout workout);
}
