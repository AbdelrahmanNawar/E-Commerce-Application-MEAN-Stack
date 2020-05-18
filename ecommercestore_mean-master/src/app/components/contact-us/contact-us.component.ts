import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
})
export class ContactUsComponent implements OnInit {
  contactObj = {
    msg: '',
    name: '',
    email: '',
    sub: '',
  };

  constructor(private router: Router) {}

  ngOnInit(): void {}

  sendMsg() {
    debugger;
    if (
      this.contactObj.name !== '' &&
      this.contactObj.msg !== '' &&
      this.contactObj.email !== '' &&
      this.contactObj.sub !== ''
    )
      // this.router.navigate['./home'];
      location.replace('/home');
  }
}
