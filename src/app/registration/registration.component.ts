import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {NewUser} from "../new-user";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html'
})
export class RegistrationComponent implements OnInit {

  private newUser: NewUser;
  private registrationSubmitted: boolean;

  constructor(private authService: AuthService, private httpClient: HttpClient, private router: Router) {
    let currentUserValue = this.authService.getCurrentUserRole();
    if (currentUserValue) {
      router.navigate([currentUserValue.homePath]);
    }
  }

  ngOnInit() {
    this.registrationSubmitted = false;
    this.newUser = new NewUser()
  }

  register() {
    this.httpClient.post('http://localhost:8080/api/register', this.newUser)
      .subscribe(
        (val) => {
          this.registrationSubmitted = true;
        },
        (response) => {
          console.log('POST call in error', response);
          console.log(response.error.message ? response.error.message : 'aaa');
          alert('Failed to register.' + (response.error.message ? ' Reason: ' + response.error.message : ''));
        }
      );
  }

}
