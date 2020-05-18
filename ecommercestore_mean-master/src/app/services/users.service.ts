import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl = 'http://winterecommerceapp.herokuapp.com/api/users';
  currentUserInfo;

  constructor(private client: HttpClient) {}

  setIntoLocalStorage() {
    localStorage.setItem('currentuser', JSON.stringify(this.getCurrentUser()));
    localStorage.setItem('token', JSON.stringify(this.getCurrentUser()));
  }

  // Register New User
  insertUser(user) {
    return this.client.post(this.baseUrl, user, { observe: 'body' });
  }

  // Login User
  loginUser(loginObject) {
    return this.client.put(this.baseUrl, loginObject, { observe: 'body' });
  }

  // Logout User
  LogOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentuser');
  }

  // Check on if the user still loggedin or not
  isLoggedIn() {
    let jwtHelper = new JwtHelperService();
    let token = localStorage.getItem('token');
    if (!token) return false;
    let expirationDate = jwtHelper.getTokenExpirationDate(token);
    let isExpired = jwtHelper.isTokenExpired(token);
    return !isExpired;
  }

  // Get current user
  getCurrentUser() {
    let token = localStorage.getItem('token');
    if (!token) return null;
    return new JwtHelperService().decodeToken(token);
    // return localStorage.getItem('currentuser');
  }

  // Get All Users
  getAllUsers() {
    let token = localStorage.getItem('token');
    return this.client.get(this.baseUrl, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token,
      }),
    });
  }

  // Get user by id
  getUserById(id) {
    let token = localStorage.getItem('token');
    return this.client.get(this.baseUrl + '/' + id, {
      observe: 'body',
      reportProgress: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token,
      }),
    });
  }

  //Update user info
  updateUserInfo(id, user) {
    let token = localStorage.getItem('token');
    return this.client.patch(this.baseUrl + '/' + id, user, {
      observe: 'body',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token,
      }),
    });
  }

  updateUserImg(id, userImg: File) {
    let token = localStorage.getItem('token');
    const formData: FormData = new FormData();
    formData.append('image', userImg, userImg.name);
    return this.client.patch(this.baseUrl + '/img/' + id, formData);
  }
}
