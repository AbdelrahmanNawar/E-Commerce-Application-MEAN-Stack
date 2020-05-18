import { Component, OnInit, EventEmitter } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  productsList;
  productsListLength;
  categoryName;
  showOptionNumber: number;
  currentUserRole;

  constructor(
    private prdService: ProductsService,
    public userService: UsersService,
    private router: Router
  ) {
    this.getPromotedProduts();
    if (!userService.getCurrentUser()) this.router.navigate['/login'];
  }

  ngOnInit(): void {
    this.showOptionNumber = 12;
    this.productsList = this.getAllProducts();
    if (this.userService.getCurrentUser())
      this.currentUserRole = this.userService.getCurrentUser().role;
    else {
      this.router.navigate['/login'];
      location.replace('/login');
    }
  }

  getAllProducts() {
    this.prdService.getAllProducts().subscribe(
      (res) => {
        this.productsList = res;
        this.productsListLength = this.productsList.length;
        this.categoryName = 'All';
      },
      (err) => {
        if (err.status === 401 || err.status === 403) {
          this.router.navigate['/login'];
          location.replace('/login');
        }
      }
    );
  }
  getWomenProducts() {
    this.prdService.getWomenProducts().subscribe(
      (res) => {
        this.productsList = res;
        this.productsListLength = this.productsList.length;
        this.categoryName = 'Women';
      },
      (err) => {
        if (err.status === 401 || err.status === 403) {
          this.router.navigate['/login'];
          location.replace('/login');
        }
      }
    );
  }
  getMenProducts() {
    this.prdService.getMenProducts().subscribe(
      (res) => {
        this.productsList = res;
        this.productsListLength = this.productsList.length;
        this.categoryName = 'Men';
      },
      (err) => {
        if (err.status === 401 || err.status === 403) {
          this.router.navigate['/login'];
          location.replace('/login');
        }
      }
    );
  }
  getChildrenProducts() {
    this.prdService.getChildrenProducts().subscribe(
      (res) => {
        this.productsList = res;
        this.productsListLength = this.productsList.length;
        this.categoryName = 'Children';
      },
      (err) => {
        if (err.status === 401 || err.status === 403)
          this.router.navigate['/login'];
        location.replace('/login');
      }
    );
  }
  getPromotedProduts() {
    this.prdService.getPromotedProducts().subscribe(
      (res) => {
        this.productsList = res;
        this.productsListLength = this.productsList.length;
        this.categoryName = 'On Sale';
      },
      (err) => console.log(err)
    );
  }

  showChanged(num: number) {
    this.showOptionNumber = +num;
  }

  showMore() {
    this.showOptionNumber += +5;
  }
}
