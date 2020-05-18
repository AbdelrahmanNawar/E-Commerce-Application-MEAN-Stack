import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { userModel } from 'src/app/models/userModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  usersList: Array<userModel>;

  constructor(private usersService: UsersService, private router: Router) {
    // if (
    //   this.usersService.getCurrentUser()?.role == 'member' ||
    //   !this.usersService.getCurrentUser()
    // ) {
    //   this.router.navigate['/login'];
    //   location.replace('/login');
    // }
  }

  ngOnInit(): void {
    this.usersList = [];
    // if (
    //   this.usersService.getCurrentUser()?.role == 'member' ||
    //   !this.usersService.getCurrentUser()
    // ) {
    //   this.router.navigate['/login'];
    //   location.replace('/login');
    // }
    // else{
      this.usersService.getAllUsers().subscribe(
        (res: Array<{}>) => {
          console.log(res);
          res.forEach((user: userModel) => {
            user.ordersCount = user.orders.length;
            this.usersList.push(user);
          });
          console.log(this.usersList);
        },
        (err) => {
          if (err.status === 401 || err.status === 403) {
            this.router.navigate['/login'];
            location.replace('/login');
          }
        }
      );
    // }
  }
}
