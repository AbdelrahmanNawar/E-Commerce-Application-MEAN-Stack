import { Component, OnInit, Input, Output } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { productModel } from 'src/app/models/productModel';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  @Input() product: productModel;
  currentUserRole;

  constructor(
    public prdService: ProductsService,
    public userService: UsersService
  ) {}

  ngOnInit(): void {
    if (this.userService.getCurrentUser())
      this.currentUserRole = this.userService.getCurrentUser().role;
    else this.currentUserRole = '';
  }

  getPrice() {
    return this.product.promotion
      ? this.product.price - this.product.promotion
      : this.product.price;
  }
}
