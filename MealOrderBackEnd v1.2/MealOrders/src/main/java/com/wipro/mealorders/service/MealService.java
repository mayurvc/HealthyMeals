package com.wipro.mealorders.service;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wipro.mealorders.model.Meal;
import com.wipro.mealorders.repository.MealRepository;

import java.util.List;

@Service
public class MealService {

    @Autowired
    private MealRepository mealRepository;

    public List<Meal> getAllMeals() {
        return mealRepository.findAll();
    }

    public Meal getMealById(Long mealId) {
        return mealRepository.findById(mealId).orElse(null);
    }

    public Meal addMeal(Meal meal) {
        return mealRepository.save(meal);
    }

    public boolean checkAvailability(Long mealId) {
        Meal meal = mealRepository.findById(mealId).orElse(null);
        return meal != null && meal.getQuantity()>=1;
    }

    public boolean deleteById(Long mealId) {
        mealRepository.deleteById(mealId);
        return true;
    }

    public void updateMeal(String id, Meal meal) {
        Meal existingMeal = getMealById(Long.parseLong(id));
        BeanUtils.copyProperties(meal,existingMeal);
        mealRepository.save(existingMeal);
    }

    // Other CRUD operations
}
