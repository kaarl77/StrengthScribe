package com.strengthscribe.strengthscribe.service;

import com.strengthscribe.strengthscribe.dto.WorkoutDto;
import com.strengthscribe.strengthscribe.entity.Workout;
import com.strengthscribe.strengthscribe.mapper.WorkoutMapper;
import com.strengthscribe.strengthscribe.repository.WorkoutRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class WorkoutService {
    private final WorkoutRepository workoutRepository;
    private final UserService userService;
    private final ExerciseService exerciseService;
    private final WorkoutMapper workoutMapper;

    public Workout getWorkoutById(Long workoutId) {
        return workoutRepository.findById(workoutId).orElseThrow(EntityNotFoundException::new);
    }

    public List<Workout> getAllWorkoutsByUserId(Long userId) {
        return workoutRepository.findByUser(userService.findById(userId));
    }

    public Workout createWorkout(Workout workout) {
        return workoutRepository.save(workout);
    }

    public Workout updateWorkoutName(Long workoutId, Workout workout) {
        Workout oldWorkout = getWorkoutById(workoutId);
        if(!workout.getName().isEmpty()) oldWorkout.setName(workout.getName());
        return workoutRepository.save(oldWorkout);
    }

    public void deleteWorkout(Long workoutId) {
        Workout workout = getWorkoutById(workoutId);
        workoutRepository.delete(workout);
    }

    public WorkoutDto addExercise(Long workoutId, Long exerciseId) {
        if (workoutId != null && exerciseId != null) {
            exerciseService.addToWorkout(workoutId, exerciseId);
        }
        return workoutMapper.entityToDto(getWorkoutById(workoutId));
    }

    public WorkoutDto deleteExercise(Long workoutId, Long exerciseId) {
        if (exerciseId != null) {
            exerciseService.deleteFromWorkout(exerciseId);
        }
        return workoutMapper.entityToDto(getWorkoutById(workoutId));
    }
}
