import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  productsList;
  prdName;

  constructor(
    private prdService: ProductsService,
    private activatedRouteObj: ActivatedRoute,
    private router: Router
  ) {
    this.prdName = activatedRouteObj.snapshot.params['name'];
  }

  ngOnInit(): void {}

  inputValueChanged(searchInputValue) {
    this.prdService.getProductByName(searchInputValue).subscribe(
      (res) => {
        this.productsList = res;
      },
      (err) => {
        if (err.status === 401 || err.status === 403) {
          location.replace('/login');
          this.router.navigate['/login'];
        }
        console.log(err);
      }
    );
  }
}
