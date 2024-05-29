package com.strengthscribe.strengthscribe.service;

import com.strengthscribe.strengthscribe.dto.BestStatsDto;
import com.strengthscribe.strengthscribe.dto.DetailedStatsDto;
import com.strengthscribe.strengthscribe.dto.RecentRecordDto;
import com.strengthscribe.strengthscribe.dto.SetRegisterDto;
import com.strengthscribe.strengthscribe.entity.Exercise;
import com.strengthscribe.strengthscribe.entity.SetRegister;
import com.strengthscribe.strengthscribe.mapper.SetRegisterMapper;
import com.strengthscribe.strengthscribe.repository.SetRegisterRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class SetRegisterService {
    private final SetRegisterRepository setRegisterRepository;
    private final SetRegisterMapper setRegisterMapper;
    private final ExerciseService exerciseService;

    public List<SetRegister> getAllRecordsByExercise(Long exerciseId) {
        return setRegisterRepository.findByExercise(exerciseService.getExerciseById(exerciseId));
    }

    public List<SetRegister> createRecords(List<SetRegister> setRegisters) {
        return setRegisters.stream().map(setRegisterRepository::save).collect(Collectors.toList());
    }

    public RecentRecordDto getRecentStats(Long exerciseId) {
        List<SetRegister> recentRecords = getLatestRegisteredRecordsBefore(exerciseId, 0l);
        RecentRecordDto recentRecordDto = new RecentRecordDto();
        recentRecordDto.setNumberOfSets(recentRecords.stream().mapToInt(SetRegister::getSetNr).max().orElseThrow(EntityNotFoundException::new));
        recentRecordDto.setAvgReps((float) recentRecords.stream().mapToDouble(SetRegister::getRepetitions).average().orElseThrow(EntityNotFoundException::new));
        recentRecordDto.setMaxReps(recentRecords.stream().mapToInt(SetRegister::getRepetitions).max().orElseThrow(EntityNotFoundException::new));
        recentRecordDto.setAvgWeight((float) recentRecords.stream().mapToDouble(SetRegister::getWeight).average().orElseThrow(EntityNotFoundException::new));
        recentRecordDto.setMaxWeight((float) recentRecords.stream().mapToDouble(SetRegister::getWeight).max().orElseThrow(EntityNotFoundException::new));
        return recentRecordDto;
    }

    public List<BestStatsDto> getSummaryStats(Long userId, boolean useWeight) {
        List<Exercise> exercises = exerciseService.getAllExercisesByUserId(userId);
        Exercise firstRandomExercise = getRandomExercise(exercises);
        Exercise secondRandomExercise = getRandomExercise(exercises);
        List<Integer> days = List.of(3, 7, 30, 6*30, 365);

        List<BestStatsDto> statsDtos = new ArrayList<>();
        statsDtos.add(getBestStatsByExerciseAndTime(firstRandomExercise, (long)getRandomInt(days), useWeight));
        statsDtos.add(getBestStatsByExerciseAndTime(secondRandomExercise, (long)getRandomInt(days), useWeight));

        return statsDtos;
    }

    public DetailedStatsDto getDetailedStats(Long exerciseId, Long numberOfDays, boolean useWeight) {
        Exercise exercise = exerciseService.getExerciseById(exerciseId);
        DetailedStatsDto detailedStatsDto = new DetailedStatsDto();
        detailedStatsDto.setPr(getPr(exerciseId));
        detailedStatsDto.setSummaryStats(getBestStatsByExerciseAndTime(exercise, numberOfDays, useWeight));
        detailedStatsDto.setRecentStats(getRecentStats(exerciseId));
        return detailedStatsDto;
    }

    public BestStatsDto getBestStatsByExerciseAndTime(Exercise exercise, Long numberOfDays, boolean useWeight) {
        Long exerciseId = exercise.getId();
        List<SetRegister> latestRegisteredRecordsBefore = getLatestRegisteredRecordsBefore(exerciseId, numberOfDays);
        Float oldAvgValue = (float) latestRegisteredRecordsBefore.stream().mapToDouble(record -> useWeight ? record.getWeight() : record.getRepetitions()).average().orElseThrow(EntityNotFoundException::new);
        List<SetRegister> recentRecords = getLatestRegisteredRecordsBefore(exerciseId, 0l);
        Float recentAvgValue = (float) recentRecords.stream().mapToDouble(record -> useWeight ? record.getWeight() : record.getRepetitions()).average().orElseThrow(EntityNotFoundException::new);
        Float growthValue = oldAvgValue - recentAvgValue;
        Float growthPercentage = ((recentAvgValue - oldAvgValue) / oldAvgValue) * 100;
        List<SetRegister> records = setRegisterRepository.findByExerciseAndRegisteredAtAfterOrderedByRegisteredAtDesc(LocalDate.now().minusDays(numberOfDays), exerciseId);

        BestStatsDto bestStatsDto = new BestStatsDto();
        bestStatsDto.setExerciseId(exerciseId);
        bestStatsDto.setExerciseName(exercise.getName());
        bestStatsDto.setProgressWent(growthPercentage < 0 ? "DOWN" : "UP");
        bestStatsDto.setProgressValue(growthValue < 0 ? (-1)*growthValue : growthValue);
        bestStatsDto.setProgressPercentage(growthPercentage < 0 ? (-1)*growthPercentage : growthPercentage);
        bestStatsDto.setOverLast(numberOfDays);
        bestStatsDto.setRecords(setRegisterMapper.entityToDtoList(records).stream().collect(Collectors.groupingBy(SetRegisterDto::getRegisteredAt)));

        return bestStatsDto;
    }

    public List<SetRegister> getLatestRegisteredRecordsBefore(Long exerciseId, Long numberOfDays) {
        LocalDate date = LocalDate.now().minusDays(numberOfDays);
        LocalDate latestRegisteredDate = setRegisterRepository.findByExerciseAndRegisteredAtBeforeOrderedByRegisteredAtDesc(date, exerciseId)
                                            .stream().map(SetRegister::getRegisteredAt).findFirst().orElseThrow(EntityNotFoundException::new);
        return setRegisterRepository.findByRegisteredAt(latestRegisteredDate);
    }

    public Exercise getRandomExercise(List<Exercise> list)
    {
        Random rand = new Random();
        return list.get(rand.nextInt(list.size()));
    }

    public Integer getRandomInt(List<Integer> list)
    {
        Random rand = new Random();
        return list.get(rand.nextInt(list.size()));
    }

    public Float getPr(Long exerciseId) {
        List<SetRegister> records = getAllRecordsByExercise(exerciseId);
        return (float)records.stream().mapToDouble(SetRegister::getWeight).max().orElseThrow(EntityNotFoundException::new);
    }
}
