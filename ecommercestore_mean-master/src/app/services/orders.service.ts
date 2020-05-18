import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { orderModel } from '../models/orderModel';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private baseUrl = 'http://winterecommerceapp.herokuapp.com/api/';

  constructor(private client: HttpClient) {}

  getAll() {
    let token = localStorage.getItem('token');
    return this.client.get(this.baseUrl + 'orders/', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token,
      }),
    });
  }
  getOrder(id) {
    let token = localStorage.getItem('token');
    return this.client.get(this.baseUrl + `orders/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token,
      }),
    });
  }
  updateOrder(id, order) {
    let token = localStorage.getItem('token');
    return this.client.patch(this.baseUrl + `orders/${id}`, order, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token,
      }),
    });
  }
  deleteOrder(id) {
    let token = localStorage.getItem('token');
    return this.client.delete(this.baseUrl + `orders/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token,
      }),
    });
  }
  getUserOrders(id) {
    let token = localStorage.getItem('token');
    return this.client.get(this.baseUrl + `orders/user/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token,
      }),
    });
  }
  insertOrder(order) {
    let token = localStorage.getItem('token');
    return this.client.post(this.baseUrl + 'orders/', order, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token,
      }),
    });
  }
}
