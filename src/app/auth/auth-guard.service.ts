import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private authenticationService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUserRole = this.authenticationService.getCurrentUserRole();
    if (currentUserRole) {
      if (route.data.roles && route.data.roles.indexOf(currentUserRole.role) === -1) {
        this.router.navigate([currentUserRole.homePath]);
        return false;
      }

      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
