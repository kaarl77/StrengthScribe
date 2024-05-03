package com.strengthscribe.strengthscribe.repository;

import com.strengthscribe.strengthscribe.entity.Exercise;
import com.strengthscribe.strengthscribe.entity.User;
import com.strengthscribe.strengthscribe.entity.Workout;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExerciseRepository extends JpaRepository<Exercise, Long> {
    List<Exercise> findByNameContainingAndUser(String name, User user);

    List<Exercise> findByUser(User user);

    List<Exercise> findByWorkout(Workout workout);

    Exercise save(Exercise exercise);

    void delete(Exercise exercise);
}
