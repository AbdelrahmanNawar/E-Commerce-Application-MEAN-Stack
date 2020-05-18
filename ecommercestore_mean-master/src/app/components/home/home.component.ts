import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  promotedProductsList;


  constructor(
    private prdService: ProductsService,
    private userService: UsersService
  ) {
    this.getPromotedProduts();
   
    }



  ngOnInit(): void {}

  getPromotedProduts() {
    this.prdService.getPromotedProducts().subscribe(
      (res) => (this.promotedProductsList = res),
      (err) => console.log(err)
    );
  }
}
