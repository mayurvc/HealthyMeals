package com.wipro.ReviewRatingDashboard.service;


import org.springframework.stereotype.Service;

import com.wipro.ReviewRatingDashboard.exception.DuplicateReviewException;
import com.wipro.ReviewRatingDashboard.exception.ResourceNotFoundException;
import com.wipro.ReviewRatingDashboard.exception.UnauthorizedAccessException;
import com.wipro.ReviewRatingDashboard.model.Review;
import com.wipro.ReviewRatingDashboard.model.ReviewDTO;
import com.wipro.ReviewRatingDashboard.repository.ReviewRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;

    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    public List<Review> getReviewsByMealId(int mealId) {
        return reviewRepository.findByMealId(mealId);
    }

    public Review addReview(ReviewDTO reviewDTO) throws DuplicateReviewException {
        Optional<Review> existingReview = reviewRepository.findByUserIdAndMealId(reviewDTO.getUserId(), reviewDTO.getMealId());
        
        if (existingReview.isPresent()) {
            throw new DuplicateReviewException("User has already reviewed this meal");
        }

        Review review = new Review();
        review.setUserId(reviewDTO.getUserId());
        review.setMealId(reviewDTO.getMealId());
        review.setRating(reviewDTO.getRating());
        review.setComments(reviewDTO.getComments());
        
        return reviewRepository.save(review);
    }

    public void deleteReview(int reviewId) throws UnauthorizedAccessException, ResourceNotFoundException {
        reviewRepository.deleteById(reviewId);
    }

    public List<Review> getAllReview() {
        return reviewRepository.findAll();
    }
}
