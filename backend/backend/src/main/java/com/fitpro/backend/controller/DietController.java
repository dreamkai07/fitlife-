package com.fitpro.backend.controller;

import com.fitpro.backend.dto.DietRequest;
import com.fitpro.backend.model.DietEntry;
import com.fitpro.backend.service.DietService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/diet")
@RequiredArgsConstructor
public class DietController {

    private final DietService dietService;

    @PostMapping("/meals")
    public ResponseEntity<DietEntry> addMeal(
            @RequestBody DietRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {

        return ResponseEntity.ok(
                dietService.addMeal(
                        request, userDetails.getUsername()
                )
        );
    }

    @GetMapping("/meals/today")
    public ResponseEntity<List<DietEntry>> getTodaysMeals(
            @AuthenticationPrincipal UserDetails userDetails) {

        return ResponseEntity.ok(
                dietService.getTodaysMeals(userDetails.getUsername())
        );
    }

    @GetMapping("/nutrition")
    public ResponseEntity<Map<String, Object>> getNutrition(
            @RequestParam(required = false) String date,
            @AuthenticationPrincipal UserDetails userDetails) {

        LocalDate targetDate = date != null ?
                LocalDate.parse(date) : LocalDate.now();

        return ResponseEntity.ok(
                dietService.getDailyNutrition(
                        userDetails.getUsername(), targetDate
                )
        );
    }

    @DeleteMapping("/meals/{id}")
    public ResponseEntity<String> deleteMeal(
            @PathVariable Long id) {
        dietService.deleteMeal(id);
        return ResponseEntity.ok("Meal deleted!");
    }
}