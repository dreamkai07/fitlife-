package com.fitpro.backend.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class WorkoutRequest {
    private String workoutName;
    private String workoutType;
    private Integer durationMinutes;
    private Integer caloriesBurned;
    private Integer sets;
    private Integer reps;
    private Double weight;
    private String notes;
    private LocalDate workoutDate;
}