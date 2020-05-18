import { Component, OnInit, Input, Output } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { productModel } from 'src/app/models/productModel';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent implements OnInit {
  @Input() productId;
  @Output() product:productModel = {};

  constructor(
    private prdService: ProductsService,
    activatedRouteObj: ActivatedRoute,
    private router: Router
  ) {
    this.productId = activatedRouteObj.snapshot.params['id'];
    this.getProductToDelete();
  }

  ngOnInit(): void {
  }

  getPrice() {
    return this.product.promotion
      ? this.product.price - this.product.promotion
      : this.product.price;
  }

  deleteProduct() {
    this.prdService.deleteSpecificProduct(this.productId).subscribe(
      (res) => console.log(res),
      (err) => {
        if (err.status === 401 || err.status === 403) {
          this.router.navigate['/login'];
          location.replace('/login');
        }
      }
    );
  }
  getProductToDelete() {
    return this.prdService.getSpecificProduct(this.productId).subscribe(
      (res) =>this.product = res[0],
      (err) => console.log(err)
    );
  }
}
