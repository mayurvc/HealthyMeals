import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtService } from 'src/app/services/jwt.service';


export interface Review {
  reviewId: number;
  userId: string;
  mealId: number;
  rating: number;
  comments: string | null;
}
@Component({
  selector: 'app-admin-reviews',
  templateUrl: './admin-reviews.component.html',
  styleUrls: ['./admin-reviews.component.css']
})
export class AdminReviewsComponent implements OnInit {
  reviews: any[] = [];
  isAlertVisible:boolean=false;

  constructor(private http: HttpClient, private jwtService: JwtService) {}

  ngOnInit(): void {
    const mealId = 1;
    this.getAllReviews(mealId);
  }

  getAllReviews(mealId:number): void {
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    this.http.get<Review[]>(`http://localhost:8080/api/reviews/meal/${mealId}`, { headers }).subscribe(
    (response: Review[]) => {
      this.reviews = response;  
    },
    (error: any) => {
      console.error('Failed to fetch meal details:', error);
      if (error.status === 401) {
        this.isAlertVisible = true; // Show login alert if unauthorized
      }
    }
  );
}

  deleteReview(reviewId: number): void {
    if (confirm('Are you sure you want to delete this review?')) {
      const token = this.jwtService.getToken();
      const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

      this.http.delete(`http://localhost:8080/api/reviews/delete/${reviewId}`, { headers }).subscribe(
        (response) => {
          this.reviews = this.reviews.filter(review => review.reviewId !== reviewId);
          alert('Review deleted successfully!');
        },
        (error: any) => {
          console.error('Failed to delete review:', error);
        }
      );
      window.location.reload();
    }
  }}
