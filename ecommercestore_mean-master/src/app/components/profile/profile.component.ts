import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { OrdersService } from 'src/app/services/orders.service';
import { userModel } from 'src/app/models/userModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  currentUser;
  userImgPreview;
  imgRes = {};
  // userData: {
  //   //   email: '',
  //   //   gender: '',
  //   //   password: '',
  //   //   role: '',
  //   //   username: '',
  //   imageUrl: string;
  //   image?: File;
  // };
  userData;

  constructor(
    private usersService: UsersService,
    private ordersService: OrdersService,
    private router: Router
  ) {
    this.currentUser = this.usersService.getCurrentUser();
  }

  ngOnInit(): void {
    this.userData = { imageUrl: '' };
    // this.userData.email = this.currentUser.userEmail;
    // this.userData.gender = this.currentUser.userGender;
    // // this.userData.imageUrl = this.currentUser.userImage;
    // // this.userData.image = this.currentUser.userImage;
    // this.userData.role = this.currentUser.role;
    // this.userData.username = this.currentUser.userName;
    // this.userData.password = this.currentUser.userPassword;
    // this.userData._id = this.currentUser.userId;

    this.getUserInfoFromDb();
  }

  getUserInfoFromDb() {
    this.usersService.getUserById(this.currentUser.userId).subscribe(
      // (res: { imageUrl: '' }) => {
      //   this.userData = res;
        (res) => {
          this.userData = res;
          // console.log('profile res')
          // console.log(res)
      },
      (err) => {
        if (err.status === 401 || err.status === 403) {
          this.router.navigate['/login'];
          location.replace('/login');
        }
        console.log(err);
      }
    );
  }

  // Image Preview
  uploadFile(event) {
    // const file = (event.target as HTMLInputElement).files[0];
    // const reader = new FileReader();
    // reader.onload = () => {
    //   this.userImgPreview = reader.result as string;
    //   this.userData.image = this.userImgPreview;
    //   this.userData.imageUrl = file.name;
    //   this.updateUserImg();
    // };
    // reader.readAsDataURL(file);


    const fileToUpload = (event.target as HTMLInputElement).files[0];
    const fileName = fileToUpload.name;
    this.userData.image = fileToUpload;
    this.userData.imageUrl = fileName;
    this.updateUserImg();
    // location.reload();
  }

  updateUserImg() {
    this.usersService
      .updateUserImg(this.currentUser.userId, 
        // {
        // image: this.userData.image,
        // imageUrl: this.userData.imageUrl,
      // }
      this.userData.image
      )
      .subscribe(
        (res: userModel) => {
          this.getUserInfoFromDb();
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
