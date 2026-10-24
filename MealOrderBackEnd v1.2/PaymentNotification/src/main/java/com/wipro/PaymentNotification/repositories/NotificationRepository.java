package com.wipro.PaymentNotification.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import com.wipro.PaymentNotification.models.Notification;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
}
