import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service'; // Adjust the path as needed
import { Router } from '@angular/router'; // For Navigation

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  username: string = '';
  role: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  // Method called on form submission
  onLogin() {
    const userData = { email: this.email, password: this.password, username: this.email, role:this.role };
    console.log(userData);
    this.authService.login(userData).subscribe(
      (response: any) => {
        console.log('Login successful:', response);
        this.authService.setToken(response.jwt); // Assuming this function sets the JWT token
        this.router.navigate(['/']).then(() => {
          window.location.reload();
        });
      },
      (error: any) => {
        console.error('Login failed:', error);
        alert('Invalid credentials. Please try again.');
      }
    );
  }
}
