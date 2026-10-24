import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from './environment';
import { SharedService } from 'src/app/services/share.service';
import { AuthService } from 'src/app/services/auth.service';
// import { Cart } from 'src/app/shared/models/Cart';

interface FoodItem {
  id: number;
  name: string;
  description: string;
  price: number;
  provider: string;
  category: string;
  quantity: number;
  imageUrl: string;
}

interface OrderItem {
  food: FoodItem;
  quantity: number;
  price: number;
}

interface CartData {
  items: OrderItem[];
  totalPrice: number;
  totalCount: number;
}

interface ExtractedData {
  meals: string;
  totalPrice: number;
  status: string;
  paymentId: string|null;
}


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  // Payment amount
  paymentAmount: number = 80; // Replace with your dynamic amount
  cartData!:CartData;
  order!:ExtractedData;
  storedOrder:any;
  summary:string='';
  provid:string = '';

  constructor(private route: Router,private authService: AuthService, private sharedService:SharedService) {}

  ngOnInit(): void {
    this.loadPayPalScript();
    // this.route.params.subscribe((params) => {
    //   console.log(params);
    //   console.log("Total: "+this.paymentAmount);
    //   this.paymentAmount = params.total
    // })
    this.cartData = this.sharedService.getData();
    console.log(JSON.stringify(this.cartData, null, 2));
    this.order = this.extractOrderData(this.cartData);
    console.log(JSON.stringify(this.order, null, 2));
    this.paymentAmount = this.cartData.totalPrice;
    console.log(this.paymentAmount);
    this.storedOrder = localStorage.getItem('meals');
    console.log(this.storedOrder);
  }

  // Load PayPal SDK script
  loadPayPalScript() {
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${environment.paypalClientId}&currency=USD`;
    script.onload = () => this.initPayPalButton();
    document.body.appendChild(script);
  }

  storeTransaction(){

  }
  storeOrder(){

  }

  // Initialize PayPal Button
  initPayPalButton() {
    (window as any).paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: this.paymentAmount.toString() // The total amount
            }
          }]
        });
      },
      onApprove: (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
          alert(`Transaction completed by ${details.payer.name.given_name}`);
          console.log(JSON.stringify(details, null, 2));
          this.order.paymentId = details.id;
          this.order.status = "Paid";
          console.log(JSON.stringify(this.order, null, 2));
          this.authService.placeOrder(this.order).subscribe(
            (response: any) => {
              console.log('Order Placed', response);
              localStorage.removeItem('Cart');
              this.route.navigate(['/orders']);
            },
            (error: any) => {
              console.error('Signup failed:', error);
              alert('Signup failed. Please try again.');
            }
          );
        });
      },
      onError: (err: any) => {
        console.error(err);
        alert('An error occurred during the transaction.');
      }
    }).render('#paypal-button-container'); // This will render the PayPal button
  }

  extractOrderData(cartData: CartData): ExtractedData {
    const extracted: ExtractedData = {
      meals:'',
      totalPrice: cartData.totalPrice,
      status: "Pending",
      paymentId: ''
    };
  
    // Iterate through items to populate meals mapping
    for (const item of cartData.items) {
      const mealName = item.food.name;
      const quantity = item.quantity;
      this.summary += `${mealName} x ${quantity}, `;
      this.summary = this.summary.slice(0, -2);
      console.log("summary: "+this.summary);
      // extracted.meals.push(mealId); // Add meal ID to the list
      // extracted.quantities.push(quantity);
    }
    extracted.meals = this.summary; 
    return extracted;
  }
}
