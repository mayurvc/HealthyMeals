package com.wipro.mealorders;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;


@SpringBootApplication
@EnableDiscoveryClient
public class MealordersApplication {

	public static void main(String[] args) {
		SpringApplication.run(MealordersApplication.class, args);
	}

}
