import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-all-meals',
  templateUrl: './all-meals.component.html',
  styleUrls: ['./all-meals.component.css']
})
export class AllMealsComponent implements OnInit {
  meals: any[] = [];
  filteredMeals: any[] = [];
  searchTerm: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.getAllMeals();
  }

  getAllMeals(): void {
    this.authService.getAllMeals().subscribe(
      (response: any) => {
        this.meals = response;
        this.filteredMeals = response; // Initialize filtered meals
        console.log('All Meals:', response);
      },
      (error: any) => {
        console.error('Failed to fetch meals:', error);
      }
    );
  }

  filterMeals(): void {
    this.filteredMeals = this.meals.filter(meal =>
      meal.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
