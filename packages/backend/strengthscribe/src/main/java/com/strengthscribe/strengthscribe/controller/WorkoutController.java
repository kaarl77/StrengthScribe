package com.strengthscribe.strengthscribe.controller;

import com.strengthscribe.strengthscribe.dto.WorkoutDto;
import com.strengthscribe.strengthscribe.entity.Workout;
import com.strengthscribe.strengthscribe.form.WorkoutForm;
import com.strengthscribe.strengthscribe.mapper.WorkoutMapper;
import com.strengthscribe.strengthscribe.service.WorkoutService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/workouts")
public class WorkoutController {
    private final WorkoutService workoutService;
    private final WorkoutMapper workoutMapper;

    @GetMapping(path = "/user/{userId}", produces = "application/json")
    public ResponseEntity<List<WorkoutDto>> getWorkoutsByUserId(@PathVariable Long userId) {
        try {
            List<Workout> workouts = workoutService.getAllWorkoutsByUserId(userId);
            return new ResponseEntity<>(workoutMapper.entityToDtoList(workouts), HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping(path = "/{id}", produces = "application/json")
    public ResponseEntity<WorkoutDto> getWorkoutById(@PathVariable Long id) {
        try {
            Workout workout = workoutService.getWorkoutById(id);
            return new ResponseEntity<>(workoutMapper.entityToDto(workout), HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping(path = "", consumes = "application/json", produces = "application/json")
    public ResponseEntity<WorkoutDto> create(@RequestBody WorkoutForm workoutForm) {
        try {
            Workout workout = workoutService.createWorkout(workoutMapper.formToEntity(workoutForm));
            return new ResponseEntity<>(workoutMapper.entityToDto(workout), HttpStatus.CREATED);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping(path = "/{id}", consumes = "application/json", produces = "application/json")
    public ResponseEntity<WorkoutDto> update(@RequestBody WorkoutForm workoutForm, @PathVariable Long id) {
        try {
            Workout workout = workoutService.updateWorkoutName(id, workoutMapper.formToEntity(workoutForm));
            return new ResponseEntity<>(workoutMapper.entityToDto(workout), HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity delete(@PathVariable Long id) {
        try {
            workoutService.deleteWorkout(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping(path = "/{workoutId}/exercise/{exerciseId}", produces = "application/json")
    public ResponseEntity<WorkoutDto> addExercise(@PathVariable Long workoutId, @PathVariable Long exerciseId) {
        try {
            return new ResponseEntity<>(workoutService.addExercise(workoutId, exerciseId), HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping(path = "/{workoutId}/exercise/{exerciseId}")
    public ResponseEntity deleteExercise(@PathVariable Long workoutId, @PathVariable Long exerciseId) {
        try {
            workoutService.deleteExercise(workoutId, exerciseId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
