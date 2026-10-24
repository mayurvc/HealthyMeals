// src/app/components/signup/signup.component.ts
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service'; // Adjust the path as needed
import { Router } from '@angular/router'; // For Navigation
import { JwtService } from "src/app/services/jwt.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  email: string = '';
  password: string = '';
  username: string = '';
  role: string = 'user';

  constructor(private authService: AuthService, private router: Router, private jwtService:JwtService) {}
  isAdmin:boolean=false;
  // Method called on form submission
  ngOnInit(){
    this.isAdmin = this.jwtService.isAdmin()
  }
  onSignup() {
    const userData = { email: this.email, password: this.password, username: this.email, role:this.role};
    console.log(userData);
    
    
    this.authService.signup(userData).subscribe(
      (response: any) => {
        console.log('Signup successful:', response);
        alert('Signup successful! You can now log in.');
        this.router.navigate(['/login']);
      },
      (error: any) => {
        console.error('Signup failed:', error);
        alert('Signup failed. Please try again.');
      }
    );
  }
}
