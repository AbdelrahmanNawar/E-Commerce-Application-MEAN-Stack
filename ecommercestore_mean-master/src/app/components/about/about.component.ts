import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  names = ['Ammar', 'Neven', 'Nawar'];
  images = ['./assets/img/developers/neven.jpeg', './assets/img/developers/neven.jpeg', './assets/img/developers/neven.jpeg'];

  constructor() {}

  ngOnInit(): void {}
}
