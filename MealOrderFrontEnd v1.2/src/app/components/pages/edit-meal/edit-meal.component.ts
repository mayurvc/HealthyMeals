import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service'; // Adjust the path if necessary

@Component({
  selector: 'app-edit-meal',
  templateUrl: './edit-meal.component.html',
  styleUrls: ['./edit-meal.component.css']
})
export class EditMealComponent implements OnInit {
  meal: { id: number; name: string; description: string; price: number; category: string; quantity: number } = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    category: '',
    quantity: 1
  };

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const mealId = +this.route.snapshot.paramMap.get('id')!; // Get the meal ID from the route
    this.authService.getMealById(mealId).subscribe(
      (data: any) => {
        this.meal = data; // Populate meal with existing data
      },
      (error) => {
        console.error('Failed to fetch meal details:', error);
        alert('Failed to load meal details.');
      }
    );
  }

  onUpdateMeal() {
    this.authService.updateMeal(this.meal).subscribe(
      (response: any) => {
        console.log('Meal updated successfully:', response);
        this.router.navigate(['/provider-dashboard']).then(() => {
          window.location.reload();
        });
      },
      (error) => {
        console.error('Failed to update meal:', error);
        alert('Failed to update meal. Please try again.');
      }
    );
  }
}
