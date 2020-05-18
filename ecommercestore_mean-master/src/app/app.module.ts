import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TooltipModule } from 'ng2-tooltip-directive';
// import { CommonModule } from '@angular/common';

import { ProductsService } from './services/products.service';
import { UsersService } from './services/users.service';
import { OrdersService } from './services/orders.service';
import { AuthGuardService } from './services/Auth/auth-guard.service';
import { AuthService } from './services/Auth/auth-service.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { SearchComponent } from './components/search/search.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { OrdersComponent } from './components/orders/orders.component';
import { UsersComponent } from './components/users/users.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { DeleteProductComponent } from './components/delete-product/delete-product.component';
import { PromotedProductsComponent } from './components/promoted-products/promoted-products.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { OrderItemComponent } from './components/order-item/order-item.component';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProtectedDirective } from './directives/protected.directive';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AboutComponent } from './components/about/about.component';
import { EditProfileComponent } from './components/profile/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './components/profile/change-password/change-password.component';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RoleGuardService } from './services/Auth/role-guard-service.service';
import { NoAccessComponent } from './components/no-access/no-access.component';
import { SearchItemComponent } from './components/search/search-item/search-item.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProductsListComponent,
    ProductItemComponent,
    SearchComponent,
    ShoppingCartComponent,
    ContactUsComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    OrdersComponent,
    UsersComponent,
    ProductDetailsComponent,
    AddProductComponent,
    EditProductComponent,
    DeleteProductComponent,
    PromotedProductsComponent,
    DropdownComponent,
    OrderItemComponent,
    UserOrdersComponent,
    ProtectedDirective,
    CheckoutComponent,
    AboutComponent,
    EditProfileComponent,
    ChangePasswordComponent,
    NoAccessComponent,
    SearchItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    Ng2SearchPipeModule,
    TooltipModule,
    // CommonModule,
    FontAwesomeModule,
  ],
  providers: [
    ProductsService,
    OrdersService,
    UsersService,
    AuthGuardService,
    AuthService,
    JwtHelperService,
    RoleGuardService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
