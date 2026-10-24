package com.wipro.ReviewRatingDashboard.model;

import lombok.Data;

@Data
public class ReviewDTO {
    private String userId;
    private int mealId;
    private int rating;
    private String comments;
}
