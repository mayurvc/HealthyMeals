import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { JwtService } from 'src/app/services/jwt.service';

@Component({
  selector: 'app-provider-dashboard',
  templateUrl: './provider-dashboard.component.html',
  styleUrls: ['./provider-dashboard.component.css']
})
export class ProviderDashboardComponent implements OnInit {
  meals: any[] = [];
  filteredMeals: any[] = [];
  apiUrl = 'http://localhost:8080/api/meals'; // Replace with your actual API endpoint
  searchTerm: string = ''; // For filtering
  sortOrder: string = 'asc'; // Default sorting order

  constructor(private http: HttpClient, private router: Router, private authService: AuthService, private jwtService:JwtService) {}

  ngOnInit(): void {
    this.getMeals();
    this.providerEmail = this.jwtService.getProviderNameFromToken()
  }

  providerEmail:string='';

  getMeals(): void {
    this.authService.getAllMeals().subscribe(
      (response: any) => {
        this.meals = response.filter((meal: any) => meal.provider === this.providerEmail);
        this.filteredMeals = response.filter((meal: any) => meal.provider === this.providerEmail); // Initialize filtered meals
        console.log('Get All Meals', response);
      },
      (error: any) => {
        console.error('Failed to fetch meals:', error);
      }
    );
  }

  // Method to filter meals based on the search term
  filterMeals(): void {
    this.filteredMeals = this.meals.filter(meal =>
      meal.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      meal.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // Method to sort meals based on name
  sortMeals(): void {
    this.filteredMeals.sort((a, b) => {
      if (this.sortOrder === 'asc') {
        return a.name.localeCompare(b.name); // Sort in ascending order
      } else {
        return b.name.localeCompare(a.name); // Sort in descending order
      }
    });
  }

  // Combined method to update meals after filtering or sorting
  updateMeals(): void {
    this.filterMeals();
    this.sortMeals();
  }

  // Call this method to toggle the sort order
  toggleSortOrder(): void {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc'; // Toggle between ascending and descending
    this.sortMeals();
  }

  addMeal(): void {
    this.router.navigate(['/add-meal']); // Change the path to your add meal route
  }

  editMeal(meal: any): void {
    this.router.navigate(['/edit-meal', meal.id]); // Change the path to your edit meal route
  }

  deleteMeal(mealId: number): void {
    console.log(mealId);
    if (confirm('Are you sure you want to delete this meal?')) {
      this.authService.deleteMealById(mealId).subscribe(
        (response: any) => {
          this.meals = this.meals.filter(meal => meal.id !== mealId);
          this.filteredMeals = this.filteredMeals.filter(meal => meal.id !== mealId); // Update filtered meals as well
          console.log('Meal Deleted', response);
        },
        (error: any) => {
          console.error('Failed to Delete Meal', error);
        }
      );
    }
  }
}
