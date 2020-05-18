import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { AuthGuardService } from './services/Auth/auth-guard.service';

import { ProductsListComponent } from './components/products-list/products-list.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { SearchComponent } from './components/search/search.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { DeleteProductComponent } from './components/delete-product/delete-product.component';
import { ProfileComponent } from './components/profile/profile.component';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderItemComponent } from './components/order-item/order-item.component';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';
import { UsersComponent } from './components/users/users.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AboutComponent } from './components/about/about.component';
import { RoleGuardService } from './services/Auth/role-guard-service.service';
import { NoAccessComponent } from './components/no-access/no-access.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'products', component: ProductsListComponent, canActivate: [AuthGuardService] },
  { path: 'product/add', component: AddProductComponent, canActivate: [AuthGuardService, RoleGuardService] },
  { path: 'product/edit/:id', component: EditProductComponent , canActivate: [AuthGuardService, RoleGuardService]},
  { path: 'product/delete/:id', component: DeleteProductComponent, canActivate: [AuthGuardService, RoleGuardService] },
  { path: 'profile/:userId', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'contact', component: ContactUsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'productDetails/:id', component: ProductDetailsComponent, canActivate: [AuthGuardService] },
  { path: 'search/:name', component: SearchComponent, canActivate: [AuthGuardService] },
  { path: 'orders', component: OrdersComponent , canActivate: [AuthGuardService, RoleGuardService]},
  { path: 'orders/:id', component: OrderItemComponent, canActivate: [AuthGuardService] },
  { path: 'users/:id/orders', component: UserOrdersComponent, canActivate: [AuthGuardService] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuardService, RoleGuardService] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuardService] },
  { path: 'about', component: AboutComponent },
  { path: 'noAccess', component: NoAccessComponent },
  { path: '**', component: NoAccessComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
