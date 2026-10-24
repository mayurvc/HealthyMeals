import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food.service';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Food } from 'src/app/shared/models/Food';
import { JwtService } from 'src/app/services/jwt.service';

export interface Review {
  reviewId: number;
  userId: string;
  mealId: number;
  rating: number;
  comments: string | null;
}
@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css']
})
export class FoodPageComponent implements OnInit {
  food!: Food;
  meal:any;
  mealId:number=0;
  isAlertVisible: boolean = false;

  showAlert() {
    this.isAlertVisible = true;
  }
  constructor(activatedRoute:ActivatedRoute, foodService:FoodService,
    private cartService:CartService, private router: Router, private authService:AuthService, private http: HttpClient,
    private jwtService: JwtService) {
    activatedRoute.params.subscribe((params) => {
      console.log(params.id);
      this.mealId = params.id
    })
   }

  ngOnInit(): void {
    this.authService.getMealById(this.mealId).subscribe({
      next: (meal) => {
        this.meal = meal; // Assign the fetched meal to the component property
        this.getMealDetails(this.mealId);
        console.log('Fetched Meal:', this.meal); // Log the fetched meal
      },
      error: (err) => {
        console.error('Error fetching meal:', err); // Handle errors here
      },
      complete: () => {
        console.log('Meal fetch complete.'); // Optional
      },
    });
    console.log("working mealid", this.meal);
  }

  // addToCart(){
  //   this.cartService.addToCart(this.meal);
  //   this.router.navigateByUrl('/cart-page');
  // }
  addToCart(){
    if(this.authService.getToken()!=null){
      this.cartService.addToCart(this.meal);
      this.router.navigateByUrl('/');
    }else{
      this.showAlert();
    }
  }


  getMealDetails(mealId: number): void {
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  
    this.http.get<Review[]>(`http://localhost:8080/api/reviews/meal/${mealId}`, { headers }).subscribe(
      (response: Review[]) => {
        console.log('Filtered Reviews:', JSON.stringify(response, null, 2));
        const filteredReviews = response.filter((review: Review) => review.mealId == mealId);
        this.meal.reviews = filteredReviews;  
        console.log('Filtered Reviews:', JSON.stringify(filteredReviews, null, 2));
      },
      (error: any) => {
        console.error('Failed to fetch meal details:', error);
        if (error.status === 401) {
          this.isAlertVisible = true; // Show login alert if unauthorized
        }
      }
    );
  }



}
