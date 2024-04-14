package com.strengthscribe.strengthscribe.controller;

import com.strengthscribe.strengthscribe.dto.ExerciseDto;
import com.strengthscribe.strengthscribe.entity.Exercise;
import com.strengthscribe.strengthscribe.form.ExerciseForm;
import com.strengthscribe.strengthscribe.mapper.ExerciseMapper;
import com.strengthscribe.strengthscribe.service.ExerciseService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/exercises")
public class ExerciseController {
    private final ExerciseService exerciseService;
    private final ExerciseMapper exerciseMapper;
    @GetMapping(path = "/user/{userId}", produces = "application/json")
    public ResponseEntity<List<ExerciseDto>> getExercisesByUserId(@PathVariable Long userId, @RequestParam(required = false) String search) {
        try {
            List<Exercise> exercises = (search == null || search.isEmpty()) ?
                    exerciseService.getAllExercisesByUserId(userId)
                    : exerciseService.getAllExercisesContainingNameAndByUserId(search, userId);
            return new ResponseEntity<>(exerciseMapper.entityToDtoList(exercises), HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping(path = "", consumes = "application/json", produces = "application/json")
    public ResponseEntity<ExerciseDto> create(@RequestBody ExerciseForm exerciseForm) {
        try {
            Exercise exercise = exerciseService.createExercise(exerciseMapper.formToEntity(exerciseForm));
            return new ResponseEntity<>(exerciseMapper.entityToDto(exercise), HttpStatus.CREATED);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping(path = "/{id}", consumes = "application/json", produces = "application/json")
    public ResponseEntity<ExerciseDto> update(@RequestBody ExerciseForm exerciseForm, @PathVariable Long id) {
        try {
            Exercise exercise = exerciseService.updateExercise(id, exerciseMapper.formToEntity(exerciseForm));
            return new ResponseEntity<>(exerciseMapper.entityToDto(exercise), HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity delete(@PathVariable Long id) {
        try {
            exerciseService.deleteExercise(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
