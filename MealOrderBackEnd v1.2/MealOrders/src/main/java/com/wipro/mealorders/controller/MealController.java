package com.wipro.mealorders.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.wipro.mealorders.model.Meal;
import com.wipro.mealorders.model.Order;
import com.wipro.mealorders.service.MealService;
import com.wipro.mealorders.service.OrderService;

import java.util.List;


@RestController
@RequestMapping("/api/mealOrder")
public class MealController {

    @Autowired
    private MealService mealService;

    @Autowired
    private OrderService orderService;

    @PostMapping
    public Order placeOrder(@RequestBody Order order) {
        return orderService.placeOrder(order);
    }

    @GetMapping("/user/{userId}")
    public List<Order> getUserOrders(@PathVariable String userId) {
        return orderService.getUserOrders();
    }

    @GetMapping
    public List<Meal> getMeals() {
        return mealService.getAllMeals();
    }

    @GetMapping("/{mealId}")
    public ResponseEntity<Meal> getMealById(@PathVariable Long mealId) {
        Meal meal = mealService.getMealById(mealId);
        return meal != null ? ResponseEntity.ok(meal) : ResponseEntity.notFound().build();
    }

    @PostMapping("/add")
    public Meal addMeal(@RequestBody Meal meal) {
        return mealService.addMeal(meal);
    }

    // New endpoint to check meal availability
    @GetMapping("/{mealId}/availability")
    public ResponseEntity<Boolean> checkMealAvailability(@PathVariable Long mealId) {
        boolean isAvailable = mealService.checkAvailability(mealId);
        return ResponseEntity.ok(isAvailable);
    }

    @DeleteMapping("/{mealId}")
    public ResponseEntity<Boolean> deleteMealById(@PathVariable Long mealId){
        boolean deleted = mealService.deleteById(mealId);
        return ResponseEntity.ok(deleted);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Boolean> updateMeal(@PathVariable String id, @RequestBody Meal meal) {
        mealService.updateMeal(id, meal);
        return ResponseEntity.ok(true);
    }

    @GetMapping("/getMyOrders")
    public List<Order> getAllUserOrders() {
        return orderService.getUserOrders();
    }

    // Other CRUD endpoints
}
