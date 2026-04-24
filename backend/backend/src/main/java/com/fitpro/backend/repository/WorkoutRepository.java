package com.fitpro.backend.repository;

import com.fitpro.backend.model.WorkoutLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface WorkoutRepository
        extends JpaRepository<WorkoutLog, Long> {

    List<WorkoutLog> findByUserIdOrderByWorkoutDateDesc(Long userId);

    List<WorkoutLog> findByUserIdAndWorkoutDate(
            Long userId, LocalDate date);

    // Custom query to get total calories burned
    @Query("SELECT SUM(w.caloriesBurned) FROM WorkoutLog w " +
            "WHERE w.user.id = :userId " +
            "AND w.workoutDate = :date")
    Integer getTotalCaloriesBurnedByDate(Long userId, LocalDate date);

    // Count workouts this month
    @Query("SELECT COUNT(w) FROM WorkoutLog w " +
            "WHERE w.user.id = :userId " +
            "AND MONTH(w.workoutDate) = MONTH(CURRENT_DATE) " +
            "AND YEAR(w.workoutDate) = YEAR(CURRENT_DATE)")
    Long countWorkoutsThisMonth(Long userId);
}