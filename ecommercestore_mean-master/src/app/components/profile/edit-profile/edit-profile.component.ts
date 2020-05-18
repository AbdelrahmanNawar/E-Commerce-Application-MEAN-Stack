import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { userModel } from 'src/app/models/userModel';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  @Input() currentUser;
  updatedUser = {
    username: "",
    email: "",
    password: "",
    newPassword: "",
    gender: "",
    role:"",
    _id:"",
    isPasswordUpdated: false
  };
  loginObject: {
    email: "",
    password: ""
  };
  Validation1: string = "";
  Validation2: string = "";
  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser();
    this.loginObject = {
      email: this.currentUser.userEmail,
      password: ""
    };
  }

  saveChanges() {
    this.loginObject.password = this.currentUser.userPassword;
    if (
      this.currentUser.userName.length >= 6 &&
      this.currentUser.userName.length < 16 &&
      this.currentUser.userPassword.length > 4 &&
      this.currentUser.userEmail.length >= 7) {
        this.userService.loginUser(this.loginObject).subscribe((res) => {
        this.updatedUser.username = this.currentUser.userName;
        this.updatedUser.password = this.currentUser.userPassword;
        this.updatedUser.email = this.currentUser.userEmail;
        this.updatedUser.gender = this.currentUser.userGender;
        this.updatedUser._id = this.currentUser.userId;
        this.updatedUser.role = this.currentUser.role;
        // this.updatedUser.imageUrl = this.currentUser.imageUrl;
        this.updatedUser.isPasswordUpdated = false;
        this.userService.updateUserInfo(this.currentUser.userId, this.updatedUser)
          .subscribe(
            (response: { accessToken: '', userTokenObject:{} }) => {
              let { accessToken, userTokenObject } = response;
              console.log(userTokenObject)
              localStorage.removeItem('token');
              localStorage.removeItem('currentuser');
              localStorage.setItem('token', accessToken);
              localStorage.setItem(
                'currentuser',
                JSON.stringify(userTokenObject)
              );
              this.Validation1 = "data is Updated Successfully";
              this.loginObject.email = this.currentUser.userEmail;
            }, (err) => {
              this.Validation2 =err.error;
            });

      }, (error) => {
        this.Validation1 = "please enter your password to update";
        this.Validation2 ="";
      });

    } else {
      this.Validation1="";
      this.Validation2 = "username length must be between 6 and 15, password must be 5 or more characters and valid email";
    }

  }

}
