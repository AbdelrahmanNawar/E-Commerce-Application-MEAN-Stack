import { Component, OnInit, Input } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { productModel } from 'src/app/models/productModel';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  @Input() productId;
  product: productModel = {
    _id: '',
    price: 0,
    promotion: 0,
    category: '',
    details: '',
    image: null,
    isDeleted: false,
    isPromoted: 'false',
    quantity: 0,
    title: '',
  };

  constructor(
    public prdService: ProductsService,
    activatedRouteObj: ActivatedRoute,
    private router: Router,
    public userService: UsersService
  ) {
    this.productId = activatedRouteObj.snapshot.params['id'] || 0;
  }

  ngOnInit(): void {
    this.getProductDetails();
  }

  

  getProductDetails() {
    return this.prdService.getSpecificProduct(this.productId).subscribe(
      (res) => {
        this.product = res[0];
      },
      (err) => {
        if (err.status === 401 || err.status === 403) {
          this.router.navigate['/login'];
          location.replace('/login');
        }
      }
    );
  }

  getPrice() {
    return this.product.promotion
      ? this.product.price - this.product.promotion
      : this.product.price;
  }

  // addProductToCart() {
  //   this.shoppingCartListOfProduct = JSON.parse(
  //     localStorage.getItem('shoppingCartProducts')
  //   );
  //   this.shoppingCartListOfProduct.push(this.product);
  //   localStorage.setItem(
  //     'shoppingCartProducts',
  //     JSON.stringify(this.shoppingCartListOfProduct)
  //   );
  // }
}
