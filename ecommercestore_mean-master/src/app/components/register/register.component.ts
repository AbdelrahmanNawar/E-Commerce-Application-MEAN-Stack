import { Component, OnInit, Input } from '@angular/core';
import { userRegisterModel } from 'src/app/models/RegisterModel';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Input() newRegisterUser: userRegisterModel = {
    username: '',
    email: '',
    password: '',
    gender: 'male',
  };
  isExitedUser;

  constructor(private userServices: UsersService, private router: Router) {}

  ngOnInit(): void {}

  RegisterNewUser() {
    if (
      this.newRegisterUser.username.length >= 6 &&
      this.newRegisterUser.username.length < 16 &&
      this.newRegisterUser.password.length > 4 &&
      this.newRegisterUser.email.length >= 7
    ) {
      this.userServices.insertUser(this.newRegisterUser).subscribe(
        (response: { accessToken: ''; userObj: '' }) => {
          let { accessToken } = response;
          localStorage.setItem('token', accessToken);
          localStorage.setItem(
            'currentuser',
            JSON.stringify(this.userServices.getCurrentUser())
          );
          this.router.navigate(['home']);
        },
        (err) => {
          if (err.status === 405) this.isExitedUser = err.error;
          console.log(err);
        }
      );
    }
  }
}
