import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Add this line
import { ReactiveFormsModule } from '@angular/forms'; // If you're using reactive forms
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { HomeComponent } from './components/pages/home/home.component';
import { RatingModule } from 'ng-starrating';
import { SearchComponent } from './components/partials/search/search.component';
import { TagsComponent } from './components/partials/tags/tags.component';
import { FoodPageComponent } from './components/pages/food-page/food-page.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { TitleComponent } from './components/partials/title/title.component';
import { NotFoundComponent } from './components/partials/not-found/not-found.component';
import { LoginComponent } from './components/pages/login/login.component';
import { SignupComponent } from './components/pages/signup/signup.component';
import { ProviderDashboardComponent } from './components/pages/provider-dashboard/provider-dashboard.component';
import { AdminDashboardComponent } from './components/pages/admin-dashboard/admin-dashboard.component';
import { AddMealComponent } from './components/pages/add-meal/add-meal.component';
import { EditMealComponent } from './components/pages/edit-meal/edit-meal.component';
import { PaymentComponent } from './components/pages/payment/payment.component';
import { OrdersComponent } from './components/pages/orders/orders.component';
import { AllMealsComponent } from './components/pages/all-meals/all-meals.component';
import { AllUsersComponent } from './components/pages/all-users/all-users.component';
import { AdminReviewsComponent } from './components/pages/admin-reviews/admin-reviews.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SearchComponent,
    TagsComponent,
    FoodPageComponent,
    CartPageComponent,
    TitleComponent,
    NotFoundComponent,
    LoginComponent,
    SignupComponent,
    ProviderDashboardComponent,
    AdminDashboardComponent,
    AddMealComponent,
    EditMealComponent,
    PaymentComponent,
    OrdersComponent,
    AllMealsComponent,
    AllUsersComponent,
    AdminReviewsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RatingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
