package com.fitpro.backend.service;

import com.fitpro.backend.dto.WorkoutRequest;
import com.fitpro.backend.model.User;
import com.fitpro.backend.model.WorkoutLog;
import com.fitpro.backend.repository.UserRepository;
import com.fitpro.backend.repository.WorkoutRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class WorkoutService {

    private final WorkoutRepository workoutRepository;
    private final UserRepository userRepository;

    // Helper method to get user
    private User getUser(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new RuntimeException("User not found!")
                );
    }

    // Add new workout
    public WorkoutLog addWorkout(
            WorkoutRequest request, String username) {

        User user = getUser(username);

        WorkoutLog workout = new WorkoutLog();
        workout.setUser(user);
        workout.setWorkoutName(request.getWorkoutName());
        workout.setWorkoutType(request.getWorkoutType());
        workout.setDurationMinutes(request.getDurationMinutes());
        workout.setCaloriesBurned(request.getCaloriesBurned());
        workout.setSets(request.getSets());
        workout.setReps(request.getReps());
        workout.setWeight(request.getWeight());
        workout.setNotes(request.getNotes());
        workout.setWorkoutDate(
                request.getWorkoutDate() != null ?
                        request.getWorkoutDate() : LocalDate.now()
        );

        return workoutRepository.save(workout);
    }

    // Get all workouts for user
    public List<WorkoutLog> getUserWorkouts(String username) {
        User user = getUser(username);
        return workoutRepository
                .findByUserIdOrderByWorkoutDateDesc(user.getId());
    }

    // Get workout stats
    public Map<String, Object> getStats(String username) {
        User user = getUser(username);
        Map<String, Object> stats = new HashMap<>();

        Integer todayCalories = workoutRepository
                .getTotalCaloriesBurnedByDate(
                        user.getId(), LocalDate.now());

        Long monthWorkouts = workoutRepository
                .countWorkoutsThisMonth(user.getId());

        stats.put("todayCaloriesBurned",
                todayCalories != null ? todayCalories : 0);
        stats.put("monthlyWorkouts", monthWorkouts);

        return stats;
    }

    // Delete workout
    public void deleteWorkout(Long workoutId, String username) {
        WorkoutLog workout = workoutRepository
                .findById(workoutId)
                .orElseThrow(() ->
                        new RuntimeException("Workout not found!")
                );
        workoutRepository.delete(workout);
    }
}