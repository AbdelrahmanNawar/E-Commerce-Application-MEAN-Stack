import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { ProductsService } from 'src/app/services/products.service';
import { productModel } from 'src/app/models/productModel';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.css']
})
export class SearchItemComponent implements OnInit {

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
