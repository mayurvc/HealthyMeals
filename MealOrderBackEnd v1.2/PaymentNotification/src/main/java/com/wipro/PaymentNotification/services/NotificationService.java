package com.wipro.PaymentNotification.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wipro.PaymentNotification.models.Notification;
import com.wipro.PaymentNotification.repositories.NotificationRepository;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    public String sendOrderNotification(String orderId) {
        Notification notification = new Notification();
        notification.setOrderId(orderId);
        notification.setMessage("Order Confirmation for Order ID: " + orderId);

        // Save notification to the database
        notificationRepository.save(notification);

        return "Notification sent successfully to Order ID: " + orderId;
    }
}
