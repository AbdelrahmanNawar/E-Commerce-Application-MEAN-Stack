import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() searchQuery;
  @Output() inputValueChangedEvent = new EventEmitter();

  productsList;
  prdName;
  userId;

  constructor(
    public prdService: ProductsService,
    private activatedRouteObj: ActivatedRoute,
    private router: Router,
    public userService: UsersService
  ) {
    this.prdName = activatedRouteObj.snapshot.params['name'];
  }

  ngOnInit() {
    if (this.userService.getCurrentUser())
      this.userId = this.getCurrentUserId();
  }

  getCurrentUserId() {
    return this.userService.getCurrentUser().userId;
  }

  inputValueChanged(searchInputValue) {
    this.searchQuery = searchInputValue;
    this.inputValueChangedEvent.emit(this.searchQuery);
  }
}
