package com.strengthscribe.strengthscribe.service;

import com.strengthscribe.strengthscribe.entity.Exercise;
import com.strengthscribe.strengthscribe.entity.User;
import com.strengthscribe.strengthscribe.repository.ExerciseRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ExerciseService {
    private final ExerciseRepository exerciseRepository;
    private final UserService userService;

    public Exercise getExerciseById(Long id) {
        return exerciseRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    public List<Exercise> getAllExercisesByUserId(Long userId) {
        return exerciseRepository.findByUser(userService.findById(userId));
    }

    public List<Exercise> getAllExercisesContainingNameAndByUserId(String search, Long userId) {
        return exerciseRepository.findByNameContainingAndUser(search, userService.findById(userId));
    }

    public Exercise createExercise(Exercise exercise) {
        return exerciseRepository.save(exercise);
    }

    public Exercise updateExercise(Long id, Exercise exercise) {
        Exercise oldExercise = getExerciseById(id);
        if(!exercise.getName().isEmpty()) oldExercise.setName(exercise.getName());
        return exerciseRepository.save(oldExercise);
    }

    public void deleteExercise(Long id) {
        Exercise exercise = exerciseRepository.findById(id).orElseThrow(EntityNotFoundException::new);
        exerciseRepository.delete(exercise);
    }

}
