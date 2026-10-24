package com.wipro.PaymentNotification.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.wipro.PaymentNotification.models.Payments;

public interface PaymentRepository extends JpaRepository<Payments, Long> {
    Payments findByPaymentId(String paymentId);
}
