import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth-service.service';
import decode from 'jwt-decode';
import { UsersService } from '../users.service';

@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(
    public router: Router,
    private userService: UsersService
  ) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    // const expectedRole = route.data.expectedRole;
    const token = localStorage.getItem('token');
    // decode the token to get its payload
    const tokenPayload = decode(token);
    if (!this.userService.isLoggedIn() || tokenPayload.role !== "admin") {
      this.router.navigate(['noAccess']);
      return false;
    }
    return true;
  }
}
