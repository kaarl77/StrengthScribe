package com.strengthscribe.strengthscribe.mapper;

import com.strengthscribe.strengthscribe.dto.SetRegisterDto;
import com.strengthscribe.strengthscribe.entity.SetRegister;
import com.strengthscribe.strengthscribe.form.SetRegisterForm;
import com.strengthscribe.strengthscribe.service.ExerciseService;
import lombok.Data;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Data
@Component
public class SetRegisterMapper {
    private final ExerciseService exerciseService;

    public SetRegister formToEntity(SetRegisterForm setRegisterForm) {
        SetRegister setRegister = new SetRegister();
        setRegister.setSetNr(setRegisterForm.getSetNr());
        setRegister.setWeight(setRegisterForm.getWeight());
        setRegister.setRepetitions(setRegisterForm.getRepetitions());
        setRegister.setRegisteredAt(setRegisterForm.getRegisteredAt());
        if (setRegisterForm.getExerciseId() != null) setRegister.setExercise(exerciseService.getExerciseById(setRegisterForm.getExerciseId()));
        return setRegister;
    }

    public SetRegisterDto entityToDto(SetRegister setRegister) {
        SetRegisterDto setRegisterDto = new SetRegisterDto();
        setRegisterDto.setId(setRegister.getId());
        setRegisterDto.setSetNr(setRegister.getSetNr());
        setRegisterDto.setWeight(setRegister.getWeight());
        setRegisterDto.setRepetitions(setRegister.getRepetitions());
        setRegisterDto.setRegisteredAt(setRegister.getRegisteredAt());
        setRegisterDto.setExerciseId(setRegister.getExercise().getId());
        return setRegisterDto;
    }

    public List<SetRegister> formToEntityList(List<SetRegisterForm> setRegisterFormList) {
        return setRegisterFormList.stream().map(this::formToEntity).collect(Collectors.toList());
    }

    public List<SetRegisterDto> entityToDtoList(List<SetRegister> setRegisters) {
        return setRegisters.stream().map(this::entityToDto).collect(Collectors.toList());
    }
}
