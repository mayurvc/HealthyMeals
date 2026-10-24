package com.wipro.PaymentNotification.models;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.criteria.Order;

@Entity
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "payment_id")
    private String paymentId;

    @Column(name = "status")
    private String status;

    @Column(name = "amount_value")
    private String amountValue;

    @Column(name = "currency_code")
    private String currencyCode;

    @Column(name = "final_capture")
    private boolean finalCapture;

    @Column(name = "created_time")
    private LocalDateTime createdTime;

    @Column(name = "updated_time")
    private LocalDateTime updatedTime;

    // @OneToOne
    // @JoinColumn(name = "order_id", nullable = false)
    // private Order order;

    // Getters and Setters
}

