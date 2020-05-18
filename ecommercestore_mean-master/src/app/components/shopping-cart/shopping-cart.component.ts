import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { productModel } from 'src/app/models/productModel';
import { ProductsService } from 'src/app/services/products.service';
import { orderModel } from 'src/app/models/orderModel';
import { OrdersService } from 'src/app/services/orders.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  @Input() shoppingCartListOfProducts = [];
  shoppingCartTotal = 0;
  orderCheckout: {
    user: string;
    products: [{}];
  };
  @Output() removeFromCartEvent = new EventEmitter();

  constructor(
    public prdService: ProductsService,
    private orderService: OrdersService,
    public userService: UsersService
  ) {
    this.shoppingCartTotal = this.prdService.getTotalCostOfCart();
  }

  ngOnInit(): void {
    // this.shoppingCartListOfProducts = this.prdService.getShoppingCartContent();
    // this.shoppingCartTotal = this.prdService.getTotalCostFromLocalStorage();

    if (this.shoppingCartListOfProducts == null)
      this.shoppingCartListOfProducts = [{}];

    this.orderCheckout = {
      user: '5eabaa55cac73750843b4950',
      products: [{}],
    };
  }

  resetCart() {
    this.prdService.resetCart();
  }

  getTotalCart() {
    return this.prdService.getTotalCostOfCart();
  }

  getFinalPriceForAproduct(product) {
    return product.promotion
      ? product.price - product.promotion
      : product.price;
  }

  // removeFromShoppingCart(event) {
  //   this.removeFromCartEvent.emit(event);
  //   console.log('remove')
  // this.prdService.removeFromShoppingCart(prd);
  // this.shoppingCartListOfProducts = this.prdService.getShoppingCartContent();
  // this.prdService.shoppingCartTotalCost = this.prdService.getTotalCostOfCart();
  // let prdIndexToRemove = this.shoppingCartListOfProducts.findIndex(
  //   (p: productModel) => p._id == prd._id
  // );
  // this.shoppingCartListOfProducts.splice(prdIndexToRemove, 1);
  // this.prdService.setToShoppingCart();
  // return this.shoppingCartListOfProducts;
  // }
}
