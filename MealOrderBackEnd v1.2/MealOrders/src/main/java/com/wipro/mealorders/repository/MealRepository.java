package com.wipro.mealorders.repository;

import com.wipro.mealorders.model.Meal;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MealRepository extends JpaRepository<Meal, Long> {
    // Custom query methods (if needed)
}
