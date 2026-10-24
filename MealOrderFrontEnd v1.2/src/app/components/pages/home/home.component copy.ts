import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { AuthService } from 'src/app/services/auth.service';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  foods: Food[] = [];
  constructor(private foodService: FoodService, activatedRoute: ActivatedRoute, private authService:AuthService) {
    activatedRoute.params.subscribe((params) => {
      if (params.searchTerm)
        this.foods = this.foodService.getAllFoodsBySearchTerm(params.searchTerm);
      else if (params.tag)
        this.foods = this.foodService.getAllFoodsByTag(params.tag);
      else
        this.foods = foodService.getAll();
    })
  }
  meals:any;
  getMeals(): void {
    this.authService.getAllMeals().subscribe(
      (response: any) => {
        this.meals = response// Initialize filtered meals
        console.log('Get All Meals', response);
      },
      (error: any) => {
        console.error('Failed to fetch meals:', error);
      }
    );
  }

  ngOnInit(): void {
    this.getMeals();
  }

}
