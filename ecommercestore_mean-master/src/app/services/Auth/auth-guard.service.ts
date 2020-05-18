import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UsersService } from '../users.service';
import { Statement } from '@angular/compiler';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public router: Router, private userService: UsersService) {}
  canActivate(): boolean {
    if (this.userService.isLoggedIn()) return true;
    this.router.navigate(['/login']) //, { queryParams: { returnUrl: state.url } });
    return false;

    // if (!this.auth.isAuthenticated()) {
    //   this.router.navigate(['login']);
    //   return false;
    // }
    // return true;
  }
}
