import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {

  isDropdownOpen = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleDropDown(){
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
