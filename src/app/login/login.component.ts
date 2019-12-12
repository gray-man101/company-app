import {Component, OnInit} from '@angular/core';
import {LoginCredentials} from '../login-credentials';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  model: LoginCredentials = new LoginCredentials();

  constructor(private authService: AuthService, private router: Router) {
    let currentUserValue = this.authService.getCurrentUserRole();
    if (currentUserValue) {
      router.navigate([currentUserValue.homePath]);
    }
  }

  ngOnInit() {
    console.log('router=' + this.router);
  }

  submitForm() {
    this.authService.login(this.model.login, this.model.password);
  }

}
