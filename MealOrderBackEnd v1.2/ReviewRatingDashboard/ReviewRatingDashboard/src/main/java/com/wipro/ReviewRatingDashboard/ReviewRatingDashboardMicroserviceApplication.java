package com.wipro.ReviewRatingDashboard;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
@EnableDiscoveryClient
@SpringBootApplication
public class ReviewRatingDashboardMicroserviceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ReviewRatingDashboardMicroserviceApplication.class, args);
	}

}
