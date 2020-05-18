import { Component, OnInit, Input, Output } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { orderModel } from 'src/app/models/orderModel';
import { userModel } from 'src/app/models/userModel';
import { productModel } from 'src/app/models/productModel';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css'],
})
export class OrderItemComponent implements OnInit {
  order: orderModel;
  products;
  orderId;
  username;
  totalCost;
  constructor(
    private service: OrdersService,
    public userService: UsersService,
    private route: ActivatedRoute) {
    this.orderId = this.route.snapshot.params['id'] || 0;
  }
  
  ngOnInit(): void {
    this.order = this.getOrderById(this.orderId);
   
  }

  getOrderById(id) {
    this.service.getOrder(id).subscribe(
      (res: orderModel) => {
        this.order = res;
        this.username = res.user.username;
        this.order.cost = this.calculateCost(this.order);
        this.totalCost = this.order.cost ;
        this.products = this.order.products;
        console.log(this.products);
      },
      (err) => {
        if(err.status === 401 || err.status === 403)
          location.replace('/login');
      }
    );
    return this.order;
  }
  calculateCost(order: orderModel) {
    let cost = 0;
    order.products.forEach((item) => {
      cost += item.Product.price * item.count;
    });
    return cost;
  }
}
