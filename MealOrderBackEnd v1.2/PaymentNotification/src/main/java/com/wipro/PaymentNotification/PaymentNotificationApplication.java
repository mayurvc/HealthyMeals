package com.wipro.PaymentNotification;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
@EnableDiscoveryClient
@SpringBootApplication
public class PaymentNotificationApplication {

	public static void main(String[] args) {
		SpringApplication.run(PaymentNotificationApplication.class, args);
	}

}
