package com.wipro.ReviewRatingDashboard.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.wipro.ReviewRatingDashboard.exception.DuplicateReviewException;
import com.wipro.ReviewRatingDashboard.exception.ResourceNotFoundException;
import com.wipro.ReviewRatingDashboard.exception.UnauthorizedAccessException;
import com.wipro.ReviewRatingDashboard.model.Order;
import com.wipro.ReviewRatingDashboard.model.Review;
import com.wipro.ReviewRatingDashboard.model.ReviewDTO;
import com.wipro.ReviewRatingDashboard.service.OrderService;
import com.wipro.ReviewRatingDashboard.service.ReviewService;

import java.util.List;


@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @Autowired
    private OrderService orderService;

    @GetMapping("/meal")
    public String getAllReview() {
        return new String();
    }
    
    @GetMapping("/meal/{mealId}")
    public ResponseEntity<List<Review>> getReviewsByMeal() {
        List<Review> reviews = reviewService.getAllReview();
        return new ResponseEntity<>(reviews, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<String> addReview(@RequestBody ReviewDTO reviewDTO) {
        try {
            reviewService.addReview(reviewDTO);
            return new ResponseEntity<>("Review added successfully", HttpStatus.CREATED);
        } catch (DuplicateReviewException e) {
            return new ResponseEntity<>("You have already reviewed this meal", HttpStatus.CONFLICT);
        }
    }

    @DeleteMapping("/delete/{reviewId}")
    public ResponseEntity<String> deleteReview(@PathVariable int reviewId) {
        try {
            reviewService.deleteReview(reviewId);
            return new ResponseEntity<>("Review deleted successfully", HttpStatus.OK);
        } catch (UnauthorizedAccessException e) {
            return new ResponseEntity<>("You are not authorized to delete this review", HttpStatus.FORBIDDEN);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>("Review not found", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/orders")
    public ResponseEntity<List<Order>> getUserOrders(@RequestParam int userId) {
        List<Order> orders = orderService.getOrdersByUserId(userId);
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }
}
