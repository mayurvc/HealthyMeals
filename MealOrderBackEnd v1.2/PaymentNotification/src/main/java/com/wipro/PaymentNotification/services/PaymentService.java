package com.wipro.PaymentNotification.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wipro.PaymentNotification.models.Payments;
import com.wipro.PaymentNotification.repositories.PaymentRepository;

import java.util.UUID;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    public Payments processPayment(String orderId, double amount) {
        Payments payment = new Payments();
        payment.setPaymentId(UUID.randomUUID().toString());
        payment.setOrderId(orderId);
        payment.setAmount(amount);
        payment.setStatus("Processed");

        // Save payment to the database
        return paymentRepository.save(payment);
    }

    public Payments getPaymentStatus(String paymentId) {
        // Retrieve payment status from the database
        return paymentRepository.findByPaymentId(paymentId);
    }
}
