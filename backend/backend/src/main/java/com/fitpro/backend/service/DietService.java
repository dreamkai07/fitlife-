package com.fitpro.backend.service;

import com.fitpro.backend.dto.DietRequest;
import com.fitpro.backend.model.DietEntry;
import com.fitpro.backend.model.User;
import com.fitpro.backend.repository.DietRepository;
import com.fitpro.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class DietService {

    private final DietRepository dietRepository;
    private final UserRepository userRepository;

    private User getUser(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new RuntimeException("User not found!")
                );
    }

    public DietEntry addMeal(
            DietRequest request, String username) {

        User user = getUser(username);

        DietEntry entry = new DietEntry();
        entry.setUser(user);
        entry.setFoodName(request.getFoodName());
        entry.setMealType(request.getMealType());
        entry.setCalories(request.getCalories());
        entry.setProtein(request.getProtein());
        entry.setCarbs(request.getCarbs());
        entry.setFats(request.getFats());
        entry.setQuantity(request.getQuantity());
        entry.setUnit(request.getUnit());
        entry.setEntryDate(
                request.getEntryDate() != null ?
                        request.getEntryDate() : LocalDate.now()
        );

        return dietRepository.save(entry);
    }

    public List<DietEntry> getTodaysMeals(String username) {
        User user = getUser(username);
        return dietRepository.findByUserIdAndEntryDate(
                user.getId(), LocalDate.now()
        );
    }

    public Map<String, Object> getDailyNutrition(
            String username, LocalDate date) {

        User user = getUser(username);
        Map<String, Object> nutrition = new HashMap<>();

        Integer calories = dietRepository
                .getTotalCaloriesByDate(user.getId(), date);
        Double protein = dietRepository
                .getTotalProteinByDate(user.getId(), date);

        nutrition.put("totalCalories",
                calories != null ? calories : 0);
        nutrition.put("totalProtein",
                protein != null ? protein : 0.0);
        nutrition.put("date", date.toString());

        return nutrition;
    }

    public void deleteMeal(Long mealId) {
        dietRepository.deleteById(mealId);
    }
}