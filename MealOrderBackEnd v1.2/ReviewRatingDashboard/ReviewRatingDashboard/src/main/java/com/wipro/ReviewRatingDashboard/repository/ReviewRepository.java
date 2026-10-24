package com.wipro.ReviewRatingDashboard.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.wipro.ReviewRatingDashboard.model.Review;

import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
    List<Review> findByMealId(int mealId);
    Optional<Review> findByUserIdAndMealId(String userId, int mealId);
}
