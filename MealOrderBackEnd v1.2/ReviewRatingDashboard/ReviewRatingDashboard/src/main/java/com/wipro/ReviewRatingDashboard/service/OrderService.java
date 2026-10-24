package com.wipro.ReviewRatingDashboard.service;


import org.springframework.stereotype.Service;

import com.wipro.ReviewRatingDashboard.model.Order;
import com.wipro.ReviewRatingDashboard.repository.OrderRepository;

import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public List<Order> getOrdersByUserId(int userId) {
        return orderRepository.findByUserId(userId);
    }
}
