package com.strengthscribe.strengthscribe.controller;

import com.strengthscribe.strengthscribe.dto.BestStatsDto;
import com.strengthscribe.strengthscribe.dto.DetailedStatsDto;
import com.strengthscribe.strengthscribe.dto.RecentRecordDto;
import com.strengthscribe.strengthscribe.dto.SetRegisterDto;
import com.strengthscribe.strengthscribe.entity.SetRegister;
import com.strengthscribe.strengthscribe.form.SetRegisterForm;
import com.strengthscribe.strengthscribe.mapper.SetRegisterMapper;
import com.strengthscribe.strengthscribe.service.SetRegisterService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/records")
public class SetRegisterController {
    private final SetRegisterService setRegisterService;
    private final SetRegisterMapper setRegisterMapper;

    @GetMapping(path = "/exercise/{exerciseId}", produces = "application/json")
    public ResponseEntity<List<SetRegisterDto>> getAll(@PathVariable Long exerciseId) {
        try {
            List<SetRegister> setRegisters = setRegisterService.getAllRecordsByExercise(exerciseId);
            return new ResponseEntity<>(setRegisterMapper.entityToDtoList(setRegisters), HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping(path = "", consumes = "application/json", produces = "application/json")
    public ResponseEntity<List<SetRegisterDto>> create(@RequestBody List<SetRegisterForm> setRegisterFormList) {
        try {
            List<SetRegister> setRegisters = setRegisterService.createRecords(setRegisterMapper.formToEntityList(setRegisterFormList));
            return new ResponseEntity<>(setRegisterMapper.entityToDtoList(setRegisters), HttpStatus.CREATED);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping(path = "/recentStats/exercise/{exerciseId}", produces = "application/json")
    public ResponseEntity<RecentRecordDto> getRecentStats(@PathVariable Long exerciseId) {
        try {
            return new ResponseEntity<>(setRegisterService.getRecentStats(exerciseId), HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping(path = "/summaryStats/user/{userId}", produces = "application/json")
    public ResponseEntity<List<BestStatsDto>> getSummaryStats(@PathVariable Long userId, @RequestParam String useWeight) {
        try {
            return new ResponseEntity<>(setRegisterService.getSummaryStats(userId, useWeight.equals("true") ? true : false), HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping(path = "/detailedStats/exercise/{exerciseId}/days/{numberOfDays}", produces = "application/json")
    public ResponseEntity<DetailedStatsDto> getDetailedStats(@PathVariable Long exerciseId, @PathVariable Long numberOfDays, @RequestParam String useWeight) {
        try {
            return new ResponseEntity<>(setRegisterService.getDetailedStats(exerciseId, numberOfDays, useWeight.equals("true") ? true : false), HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
