import { Component, OnInit, Input } from '@angular/core';
import { productModel } from 'src/app/models/productModel';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-promoted-products',
  templateUrl: './promoted-products.component.html',
  styleUrls: ['./promoted-products.component.css']
})
export class PromotedProductsComponent implements OnInit {
  @Input() product: productModel;

  constructor(private prdService: ProductsService) {}

  ngOnInit(): void {}

  getPrice() {
    return this.product.promotion
      ? this.product.price - this.product.promotion
      : this.product.price;
  }

}
