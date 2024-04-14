package com.strengthscribe.strengthscribe.repository;

import com.strengthscribe.strengthscribe.entity.Exercise;
import com.strengthscribe.strengthscribe.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExerciseRepository extends JpaRepository<Exercise, Long> {
    List<Exercise> findByNameContainingAndUser(String name, User user);

    List<Exercise> findByUser(User user);

    Exercise save(Exercise exercise);

    void delete(Exercise exercise);
}
