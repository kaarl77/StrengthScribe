package com.strengthscribe.strengthscribe.mapper;

import com.strengthscribe.strengthscribe.dto.ExerciseDto;
import com.strengthscribe.strengthscribe.entity.Exercise;
import com.strengthscribe.strengthscribe.form.ExerciseForm;
import com.strengthscribe.strengthscribe.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import lombok.Data;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Data
@Component
public class ExerciseMapper {
    private final UserService userService;

    public Exercise formToEntity(ExerciseForm exerciseForm) {
        Exercise exercise = new Exercise();
        exercise.setName(exerciseForm.getName());
        if (exerciseForm.getUserId() != null) exercise.setUser(userService.findById(exerciseForm.getUserId()));
        return exercise;
    }

    public ExerciseDto entityToDto(Exercise exercise) {
        ExerciseDto exerciseDto = new ExerciseDto();
        exerciseDto.setId(exercise.getId());
        exerciseDto.setName(exercise.getName());
        exerciseDto.setUserId(exercise.getUser().getId());
        return exerciseDto;
    }

    public List<ExerciseDto> entityToDtoList(List<Exercise> exercises) {
        return exercises.stream().map(this::entityToDto).collect(Collectors.toList());
    }
}
