package com.wipro.PaymentNotification.controllers;

import com.wipro.PaymentNotification.models.Payments;
import com.wipro.PaymentNotification.services.NotificationService;
import com.wipro.PaymentNotification.services.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/paymentsNotifications")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private NotificationService notificationService;

    @PostMapping("/order/{orderId}")
    public String sendOrderNotification(@PathVariable String orderId) {
        return notificationService.sendOrderNotification(orderId);
    }
    
    @PostMapping("/process")
    public Payments processPayment(@RequestParam String orderId, @RequestParam double amount) {
        return paymentService.processPayment(orderId, amount);
    }

    @GetMapping("/status/{paymentId}")
    public Payments getPaymentStatus(@PathVariable String paymentId) {
        return paymentService.getPaymentStatus(paymentId);
    }
}
