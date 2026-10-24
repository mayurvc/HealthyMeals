import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { JwtService } from 'src/app/services/jwt.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: any[] = []; // Array to hold all orders
  filteredOrders: any[] = []; // Array to hold filtered orders
  searchTerm: string = ''; // For filtering orders
  sortOrder: string = 'asc'; // Default sorting order

  constructor(private http: HttpClient, private authService: AuthService,  private jwtService: JwtService) {}

  ngOnInit(): void {
    this.getOrders();
  }

  // Fetch all orders from the API
  getOrders(): void {
    this.authService.getMyOrders().subscribe(
      (response: any) => {
        const user =  this.jwtService.getProviderNameFromToken();
        console.log(user)
        this.orders = response; // Assign fetched orders to orders array
        this.filteredOrders = response.filter((meal: any) => meal.userId === user); // Initialize filtered orders
        console.log('Fetched Orders', response);
      },
      (error: any) => {
        console.error('Failed to fetch orders:', error);
      }
    );
  }

  // Update the displayed orders based on the search term and sort order
  updateOrders(): void {
    this.filterOrders();
    this.sortOrders();
  }

  // Filter orders based on the search term
  filterOrders(): void {
    this.filteredOrders = this.orders.filter(order =>
      order.id.toString().includes(this.searchTerm) || // Filter by Order ID
      order.status.toLowerCase().includes(this.searchTerm.toLowerCase()) // Filter by Status
    );
  }

  // Sort orders based on date
  sortOrders(): void {
    this.filteredOrders.sort((a, b) => {
      if (this.sortOrder === 'asc') {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(); // Ascending order
      } else {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); // Descending order
      }
    });
  }

  // Toggle sorting order between ascending and descending
  toggleSortOrder(): void {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc'; // Toggle between ascending and descending
    this.sortOrders(); // Re-sort orders based on the new sort order
  }
}
