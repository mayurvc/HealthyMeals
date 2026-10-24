package com.wipro.mealorders.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

// import com.wipro.mealorders.model.GetMyOrdersResponse;
import com.wipro.mealorders.model.Meal;
import com.wipro.mealorders.model.Order;
// import com.wipro.mealorders.model.OrderMeals;
import com.wipro.mealorders.repository.MealRepository;
// import com.wipro.mealorders.repository.OrderMealsRepository;
import com.wipro.mealorders.repository.OrderRepository;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;
    // @Autowired
    // private OrderMealsRepository orderMealsRepository;
    @Autowired
    private MealRepository mealRepository;

    @Autowired
    private MealService mealService; // Inject MealService to check meal availability

    public Order placeOrder(Order order) {
        // Check availability for each meal before placing the order
        // for (Long mealId : order.g()) {
        //     if (!mealService.checkAvailability(mealId)) {
        //         throw new IllegalArgumentException("Meal with ID " + mealId + " is not available.");
        //     }
        // }
        return orderRepository.save(order);
    }

    public List<Order> getUserOrders() {
        return orderRepository.findAll();
    }

    // public List<Order> getMyOrders(String userId) {
    //     GetMyOrdersResponse GetMyOrdersResponse = new GetMyOrdersResponse();
    //     List<Order> myOrders = orderRepository.findByUserId(userId);
    //     for (Order order: myOrders){
    //         List<OrderMeals> orderedMeals = orderMealsRepository.findByOrderId(order.getId());
    //         for(OrderMeals meal:orderedMeals){
    //             // Meal me = mealRepository.findById();
    //         }
    //     }
    //     throw new UnsupportedOperationException("Unimplemented method 'getMyOrders'");
    // }
}
