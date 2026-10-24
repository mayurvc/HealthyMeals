package com.wipro.ReviewRatingDashboard.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.wipro.ReviewRatingDashboard.model.Order;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Integer> {
    List<Order> findByUserId(int userId);
}
