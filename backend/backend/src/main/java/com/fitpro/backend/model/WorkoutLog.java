package com.fitpro.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "workout_logs")
@Data
@NoArgsConstructor
public class WorkoutLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String workoutName;

    private String workoutType;
    private Integer durationMinutes;
    private Integer caloriesBurned;
    private Integer sets;
    private Integer reps;
    private Double weight;
    private String notes;

    @Column(nullable = false)
    private LocalDate workoutDate;

    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        if (workoutDate == null) {
            workoutDate = LocalDate.now();
        }
    }
}