import { Directive, OnDestroy } from '@angular/core';
// import { ROUTER_DIRECTIVES, Router, Location } from 'angular2/router';
import { UsersService } from '../services/users.service';

@Directive({
  selector: '[appProtected]',
})
export class ProtectedDirective implements OnDestroy {
  private sub: any = null;

  constructor(
    private userService: UsersService,
    // private router: Router,
    // private location: Location
  ) {
    if (!userService.isLoggedIn()) {
      // this.location.replaceState('/'); // clears browser history so they can't navigate with back button
      // this.router.navigate(['home']);
    }

    // this.sub = this.userService.subscribe((val) => {
    //   if (!val.authenticated) {
    //     this.location.replaceState('/'); // clears browser history so they can't navigate with back button
    //     this.router.navigate(['home']); // tells them they've been logged out (somehow)
    //   }
    // });
  }

  ngOnDestroy() {
    if (this.sub != null) {
      this.sub.unsubscribe();
    }
  }
}
