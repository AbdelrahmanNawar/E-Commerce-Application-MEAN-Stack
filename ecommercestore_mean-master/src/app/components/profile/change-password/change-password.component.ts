import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  @Input() dataBind = {
    oldPassword: "",
    newPassword: ""
  };
  currentUser;
  updatedUser = {
    username: "",
    email: "",
    password: "",
    newPassword: "",
    gender: "",
    isPasswordUpdated: true
  };
  loginObject: {
    email: "",
    password: string
  }
  Validation1: string = "";
  Validation2: string = "";
  Success: string="";
  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser();
    this.loginObject = {
      email: this.currentUser.userEmail,
      password: ""
    };
    this.dataBind = {
      oldPassword: "",
      newPassword: ""
    };
  }
  saveChanges() {
    if (this.dataBind.newPassword.length >= 5) {
      this.currentUser = this.userService.getCurrentUser();
      this.loginObject.email = this.currentUser.userEmail;
      this.loginObject.password = this.dataBind.oldPassword;
      this.userService.loginUser(this.loginObject).subscribe((res) => {
        this.updatedUser.username = this.currentUser.userName;
        this.updatedUser.password = this.dataBind.oldPassword;
        this.updatedUser.newPassword = this.dataBind.newPassword;
        this.updatedUser.email = this.currentUser.userEmail;
        this.updatedUser.gender = this.currentUser.userGender;
        this.updatedUser.isPasswordUpdated = true;
        this.userService.updateUserInfo(this.currentUser.userId, this.updatedUser)
          .subscribe(
            (response: { accessToken: '' }) => {
              let { accessToken } = response;
              localStorage.removeItem('token');
              localStorage.removeItem('currentuser');
              localStorage.setItem('token', accessToken);
              localStorage.setItem(
                'currentuser',
                JSON.stringify(this.userService.getCurrentUser())
              );
            }, (err) => {
              console.log("Error" + err);
            });
        this.Success = "Password Updated Successfully";
        this.Validation1 = "";
        this.Validation2 = "";
      }, (error) => {
        this.Success ="";
        this.Validation2="";
        this.Validation1 = "please enter your password to update";
      });
    } else {
      this.Success = "";
      this.Validation1 = "";
      this.Validation2 = "password needs to be 6 or more characters";
    }
  }
}
