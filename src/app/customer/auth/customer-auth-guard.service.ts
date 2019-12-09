import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../../auth.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerAuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if (!(await this.authService.isLoggedIn())) {
      await this.router.navigate(['/login']);
      return false;
    }

    if (!this.authService.hasRole('CUSTOMER')) {
      await this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}
