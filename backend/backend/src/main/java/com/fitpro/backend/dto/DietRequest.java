package com.fitpro.backend.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class DietRequest {
    private String foodName;
    private String mealType;
    private Integer calories;
    private Double protein;
    private Double carbs;
    private Double fats;
    private Double quantity;
    private String unit;
    private LocalDate entryDate;
}