import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { FoodService } from 'src/app/services/food.service';
import { AuthService } from 'src/app/services/auth.service';
import { Food } from 'src/app/shared/models/Food';import { JwtService } from 'src/app/services/jwt.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  foods: Food[] = [];
  constructor(private foodService: FoodService, activatedRoute: ActivatedRoute, private authService:AuthService, private http: HttpClient, private jwtService: JwtService) {
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
  isModalOpen: boolean = false;
  selectedMeal: any = null;
  userRating: number = 0;
  userReview: string = '';
  openRatingModal(meal: any): void {
    this.selectedMeal = meal;
    this.isModalOpen = true;
  }

  // Close the rating modal
  closeModal(): void {
    this.isModalOpen = false;
    this.selectedMeal = null;
    this.userRating = 0;
    this.userReview = '';
  }

  // Submit the rating to the backend
  submitRating(): void {
    if (!this.userRating || this.userRating < 1 || this.userRating > 5) {
      alert('Please enter a valid rating between 1 and 5.');
      return;
    }
    const user = this.jwtService.getProviderNameFromToken();
    const ratingData = {
      mealId: this.selectedMeal.id,
      rating: this.userRating,
      comments: this.userReview,
      userId: user
    };
    const token = this.jwtService.getToken();

    // Set up headers with the Authorization token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    this.http.post('http://localhost:8080/api/reviews/add', ratingData, {headers} ).subscribe(
      (response:any) => {
        alert('Thank you for your feedback!');
        this.closeModal(); // Close the modal after submission
        this.getMeals(); // Refresh the meals list
      },
      (error:any) => {
        console.error('Failed to submit rating:', error);
        this.closeModal();
        window.alert(error.error);
      }
    );
  }
  getMeals(): void {
    this.authService.getAllMeals().subscribe(
      (response: any) => {
        this.meals = response
        console.log(this.meals);
        localStorage.setItem('meals', JSON.stringify(this.meals));
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
