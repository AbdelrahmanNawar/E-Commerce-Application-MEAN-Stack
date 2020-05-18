import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { OrdersService } from 'src/app/services/orders.service';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  shoppingCartListOfProducts = [];
  shoppingCartTotal = 0;
  user;
  count;
  totalCost;

  orderCheckout: {
    user: string;
    products: [{}];
  };
  constructor(
    public prdService: ProductsService,
    private orderService: OrdersService,
    public userService: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    console.log(this.prdService.localStorageName);
    this.shoppingCartListOfProducts = this.prdService.getShoppingCartContent();
    this.shoppingCartTotal = this.prdService.getTotalCostFromLocalStorage();

    // this.getTotalPriceOfShoppingCart();
  }

  insertOrder() {
    this.orderCheckout = {
      user: this.user.userId,
      products: [{}],
    };
    this.orderCheckout.products[0] = {
      Product: this.shoppingCartListOfProducts[0]._id,
      count: this.shoppingCartListOfProducts[0].count,
    };
    for (let i = 1; i < this.shoppingCartListOfProducts.length; i++) {
      const element = this.shoppingCartListOfProducts[i];
      this.orderCheckout.products.push({
        Product: element._id,
        count: element.count,
      });
    }
    console.log(this.orderCheckout);
    this.orderService.insertOrder(this.orderCheckout).subscribe(
      (res) => {
        console.log(res);
        this.shoppingCartListOfProducts = [];
        this.prdService.clearShoppingCart();
        this.getTotalPriceOfShoppingCart();
        let profileId = this.userService.getCurrentUser().userId;
        location.replace(`/profile/${{ profileId }}`);
      },
      (err) => {
        if (err.status === 401 || err.status === 403) {
          this.router.navigate['/login'];
          location.replace('/login');
        }
        console.log(err);
      }
    );
  }

  getTotalPriceOfShoppingCart() {
    this.shoppingCartTotal = 0;
    if (this.shoppingCartListOfProducts.length > 0)
      this.shoppingCartListOfProducts.forEach((prd) => {
        this.shoppingCartTotal += this.getFinalPriceForAproduct(prd);
      });
    return this.shoppingCartTotal;
  }

  getFinalPriceForAproduct(product) {
    return product.promotion
      ? (product.price - product.promotion) * product.count
      : product.price * product.count;
  }
}
