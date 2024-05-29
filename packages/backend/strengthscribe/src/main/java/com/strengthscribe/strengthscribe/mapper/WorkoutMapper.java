package com.strengthscribe.strengthscribe.mapper;

import com.strengthscribe.strengthscribe.dto.ExerciseDto;
import com.strengthscribe.strengthscribe.dto.WorkoutDto;
import com.strengthscribe.strengthscribe.entity.Exercise;
import com.strengthscribe.strengthscribe.entity.Workout;
import com.strengthscribe.strengthscribe.form.WorkoutForm;
import com.strengthscribe.strengthscribe.service.ExerciseService;
import com.strengthscribe.strengthscribe.service.UserService;
import lombok.Data;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Data
@Component
public class WorkoutMapper {
    private final UserService userService;
    private final ExerciseService exerciseService;
    private final ExerciseMapper exerciseMapper;

    public Workout formToEntity(WorkoutForm workoutForm) {
        Workout workout = new Workout();
        workout.setName(workoutForm.getName());
        if (workoutForm.getUserId() != null) workout.setUser(userService.findById(workoutForm.getUserId()));
        return workout;
    }

    public WorkoutDto entityToDto(Workout workout) {
        WorkoutDto workoutDto = new WorkoutDto();
        workoutDto.setId(workout.getId());
        workoutDto.setName(workout.getName());
        workoutDto.setUserId(workout.getUser().getId());
        List<ExerciseDto> exercises = exerciseMapper.entityToDtoList(exerciseService.getAllExercisesByWorkoutId(workout.getId()));
        workoutDto.setExercises(exercises);
        return workoutDto;
    }

    public List<WorkoutDto> entityToDtoList(List<Workout> workouts) {
        return workouts.stream().map(this::entityToDto).collect(Collectors.toList());
    }
}
