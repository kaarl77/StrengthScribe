package com.strengthscribe.strengthscribe.repository;

import com.strengthscribe.strengthscribe.entity.Exercise;
import com.strengthscribe.strengthscribe.entity.SetRegister;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface SetRegisterRepository extends JpaRepository<SetRegister, Long> {
    List<SetRegister> findByExercise(Exercise exercise);

    @Query(value = "select * from set_register s where s.registered_at < ?1 and exercise_id = ?2 order by s.registered_at desc", nativeQuery = true)
    List<SetRegister> findByExerciseAndRegisteredAtBeforeOrderedByRegisteredAtDesc(LocalDate registeredAt, Long exerciseId);

    @Query(value = "select * from set_register s where s.registered_at > ?1 and exercise_id = ?2 order by s.registered_at asc", nativeQuery = true)
    List<SetRegister> findByExerciseAndRegisteredAtAfterOrderedByRegisteredAtDesc(LocalDate registeredAt, Long exerciseId);

    List<SetRegister> findByRegisteredAt(LocalDate registeredAt);

    SetRegister save(SetRegister setRegister);
}
