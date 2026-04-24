package com.fitpro.backend.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String username;
    private String email;
    private String password;
    private String fullName;
    private Integer age;
    private Double weight;
    private Double height;
    private String fitnessGoal;
    private String activityLevel;
}