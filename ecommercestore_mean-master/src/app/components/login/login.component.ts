import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { LoginModel } from 'src/app/models/LoginModel';
import { Router } from '@angular/router';
import * as jwtDecoder from 'jwt-decode';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @Input() loginObject: LoginModel = {
    email: '',
    password: '',
  };
  invalidLogin: boolean = false;
  currentUser;

  constructor(private userServices: UsersService, private router: Router, private prdService: ProductsService) {}

  ngOnInit(): void {}

  Login() {
    if (
      this.loginObject.password.length > 4 &&
      this.loginObject.email.length >= 7
    ) {
      // debugger;
      this.userServices.loginUser(this.loginObject).subscribe(
        (response: { accessToken: ''; userObj: '' }) => {
          let { accessToken } = response;
          // let jwtDec = jwtDecoder(accessToken);
          localStorage.setItem('token', accessToken);
          localStorage.setItem(
            'currentuser',
            JSON.stringify(this.userServices.getCurrentUser())
          );
          this.prdService.initLocalStorageName();
          this.prdService.shoppingCartListOfProducts = this.prdService.getShoppingCartContent();
          this.prdService.shoppingCartTotalCost = this.prdService.getTotalCostOfCart();
          this.userServices.currentUserInfo = this.userServices.getCurrentUser();
          if (
            this.prdService.shoppingCartListOfProducts == null ||
            this.prdService.shoppingCartListOfProducts.length == 0
          )
            this.prdService.shoppingCartListOfProducts = [];
          else
            this.prdService.shoppingCartListOfProducts.forEach((product) => {
              if (product.promotion)
                product.totalCost = product.price - product.promotion;
              else product.totalCost = product.price;
            });
          this.invalidLogin = false;
          this.router.navigate(['home']);
        },
        (err) => {
          this.invalidLogin = true;
          console.log(err);
        }
      );
    }
  }
}
