import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtService } from "src/app/services/jwt.service";
import { Observable,BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/'; // Backend URL

  constructor(private jwtService: JwtService,private http: HttpClient) {}
  
  getMyOrders(): Observable<any>{
    const token = this.getToken(); // Get the token
    const userId = this.jwtService.getProviderNameFromToken()
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token || ''}`, // Fallback to empty string if null
    });
    return this.http.get(`${this.apiUrl}api/mealOrder/getMyOrders`,  { headers });
  }
  placeOrder(cart:any): Observable<any>{
    const token = this.getToken(); // Get the token
    cart.userId = this.jwtService.getProviderNameFromToken()
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token || ''}`, // Fallback to empty string if null
    });
    return this.http.post(`${this.apiUrl}api/mealOrder`, cart,  { headers });
  }

  addMeal(meal: { name: string; description: string; quantity:number; price: number; category: string; provider:string}): Observable<any>{
    const token = this.getToken(); // Get the token
    meal.provider = this.jwtService.getProviderNameFromToken()
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token || ''}`, // Fallback to empty string if null
    });
    return this.http.post(`${this.apiUrl}api/mealOrder/add`, meal,  { headers });
  }
  getAllMeals(): Observable<any>{
    const token = this.getToken(); // Get the token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token || ''}`, // Fallback to empty string if null
    });
    return this.http.get(`${this.apiUrl}api/mealOrder`,  { headers });
  }
  getAllUsers(): Observable<any>{
    const token = this.getToken(); // Get the token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token || ''}`, // Fallback to empty string if null
    });
    return this.http.get(`${this.apiUrl}api/users/getAllUsers`,  { headers });
  }
  getMealById(id:number): Observable<any>{
    const token = this.getToken(); // Get the token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token || ''}`, // Fallback to empty string if null
    });
    return this.http.get(`${this.apiUrl}api/mealOrder/${id}`,  { headers });
  }

  deleteMealById(id:number): Observable<any>{
    const token = this.getToken(); // Get the token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token || ''}`, // Fallback to empty string if null
    });
    return this.http.delete(`${this.apiUrl}api/mealOrder/${id}`,  { headers });
  }
  updateMeal(meal: any): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token || ''}`
    });
    return this.http.put(`${this.apiUrl}api/mealOrder/${meal.id}`, meal, { headers });
  }
  login(userData: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}api/users/login`, userData);
  }
  signup(userData: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}api/users/register`, userData);
  }
  ngOnInit() {
    console.log('Token on Init:', localStorage.getItem('token')); // Check if token is available
  }
  signupAdmin(userData: { email: string; password: string; role: string }): Observable<any> {
    const token = this.getToken(); // Get the token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token || ''}`, // Fallback to empty string if null
    });

    return this.http.post(`${this.apiUrl}api/users/register/adminAndProvider`, userData, { headers });
  }
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  loggedIn$ = this.loggedIn.asObservable();
  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Save token to localStorage and update login state
  setToken(token: string): void {
    localStorage.setItem('token', token);
    this.loggedIn.next(true);  // Notify subscribers
  }

  // Remove token from localStorage and update login state
  removeToken(): void {
    console.log("LogsOut");
    localStorage.removeItem('token');
    this.loggedIn.next(false); // Notify subscribers
  }

  getProvider(): Observable<any> {
    const token = this.getToken(); // Get the token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token || ''}`, // Fallback to empty string if null
    });
    return this.http.get(`${this.apiUrl}api/users/getProvider`,{headers});
  }

  
}
