import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { FoodPageComponent } from './components/pages/food-page/food-page.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { SignupComponent } from './components/pages/signup/signup.component';
import { ProviderDashboardComponent } from './components/pages/provider-dashboard/provider-dashboard.component';
import { AdminDashboardComponent } from './components/pages/admin-dashboard/admin-dashboard.component';
import { AddMealComponent } from './components/pages/add-meal/add-meal.component';
import { EditMealComponent } from './components/pages/edit-meal/edit-meal.component';
import { PaymentComponent } from './components/pages/payment/payment.component';
import { OrdersComponent } from './components/pages/orders/orders.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search/:searchTerm', component: HomeComponent },
  { path: 'tag/:tag', component: HomeComponent },
  {path:'food/:id', component:FoodPageComponent},
  {path:'cart-page', component: CartPageComponent},
  {path:'login', component: LoginComponent},
  {path:'signup', component: SignupComponent},
  {path:'provider-dashboard', component: ProviderDashboardComponent},
  {path:'admin-dashboard', component: AdminDashboardComponent},
  {path:'add-meal', component: AddMealComponent},
  { path: 'edit-meal/:id', component: EditMealComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'orders', component: OrdersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
