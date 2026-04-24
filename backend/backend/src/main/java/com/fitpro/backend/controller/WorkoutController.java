package com.fitpro.backend.controller;

import com.fitpro.backend.dto.WorkoutRequest;
import com.fitpro.backend.model.WorkoutLog;
import com.fitpro.backend.service.WorkoutService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/workouts")
@RequiredArgsConstructor
public class WorkoutController {

    private final WorkoutService workoutService;

    @PostMapping
    public ResponseEntity<WorkoutLog> addWorkout(
            @RequestBody WorkoutRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {

        return ResponseEntity.ok(
                workoutService.addWorkout(
                        request, userDetails.getUsername()
                )
        );
    }

    @GetMapping
    public ResponseEntity<List<WorkoutLog>> getWorkouts(
            @AuthenticationPrincipal UserDetails userDetails) {

        return ResponseEntity.ok(
                workoutService.getUserWorkouts(
                        userDetails.getUsername()
                )
        );
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats(
            @AuthenticationPrincipal UserDetails userDetails) {

        return ResponseEntity.ok(
                workoutService.getStats(userDetails.getUsername())
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteWorkout(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {

        workoutService.deleteWorkout(
                id, userDetails.getUsername()
        );
        return ResponseEntity.ok("Workout deleted!");
    }
}