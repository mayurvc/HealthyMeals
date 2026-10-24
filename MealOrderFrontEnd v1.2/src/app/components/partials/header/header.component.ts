import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { JwtService } from "src/app/services/jwt.service";
import { AuthService } from "src/app/services/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user:any = '😋';
  isAdmin: boolean=false;
  isProvider:boolean=false;
  isLoggedIn: boolean = false;
  isUser:boolean = false;
  cartQuantity=0;
  constructor(private jwtService: JwtService, private cartService: CartService,private authService: AuthService, private router: Router) {
    cartService.getCartObservable().subscribe((newCart) => {
      this.cartQuantity = newCart.totalCount;
      this.checkLoginStatus();
    })
   }
   ngOnInit(): void {
    this.authService.loggedIn$.subscribe((status:any) => {
      this.isLoggedIn = status;
    });
    this.isAdmin = this.jwtService.isAdmin();
    this.isProvider = this.jwtService.isProvider();
    this.isUser = this.jwtService.isUser();
    const token = localStorage.getItem('token'); // Adjust if you're using a different storage method
    console.log(token);
    if (token) {
      console.log(this.user);
      console.log(token);
        const userInfo = this.jwtService.getUserInfo(token);
        console.log(userInfo);
        this.user = this.capitalizeFirstLetter(userInfo?.sub?.split('@')[0] || 'Guest');
        console.log(this.user);
    } else {
        console.error('No token found');
    }
}
capitalizeFirstLetter(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}
 logout(): void {
    this.authService.removeToken(); // Clear the token from the service
    localStorage.removeItem('token'); // Optionally clear from localStorage
    this.checkLoginStatus(); // Update the login status
    this.router.navigate(['/']).then(() => {
      window.location.reload();});
  }
checkLoginStatus(): void {
  // Check if the token exists in localStorage
  this.isLoggedIn = !!localStorage.getItem('token');
}

}
