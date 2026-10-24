import { Component } from '@angular/core';
import { Router } from '@angular/router'; // For Navigation
import { AuthService } from 'src/app/services/auth.service'; // Import AuthService

@Component({
  selector: 'app-add-meal',
  templateUrl: './add-meal.component.html',
  styleUrls: ['./add-meal.component.css']
})
export class AddMealComponent {
  meal: { name: string; description: string; quantity:number; price: number; category: string; provider:string} = {
    name: '',
    description: '',
    quantity:1,
    price: 0,
    category: '',
    provider:''
  };
  isAuthenticated: boolean = false; // To track authentication status

  constructor(private authService: AuthService, private router: Router) {  }

  // Method called on form submission
  onAddMeal() {
    console.log('Adding meal:', this.meal);
    this.authService.addMeal(this.meal).subscribe(
      (response: any) => {
        console.log('Meal added successfully:', response);
        this.router.navigate(['/provider-dashboard']).then(() => {
          window.location.reload();
        });
      },
      (error: any) => {
        console.error('Failed to add meal:', error);
        alert('Failed to add meal. Please try again.');
      }
    );
  }
}
