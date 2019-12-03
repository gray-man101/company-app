import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  login(login: string, password: string) {
    const body = new HttpParams()
      .set('username', login)
      .set('password', password);
    this.httpClient.post(
      'http://localhost:8080/login',
      body.toString(), {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      }).subscribe(
      (val) => {
        console.log("POST call successful 123");
        sessionStorage.setItem('token', '123')
        this.router.navigate(['/'])
      },
      (response) => {
        console.log("POST call in error", response);
        this.router.navigate(['/login'])
      }
    );
  }

  isLoggedIn() {
    return !(sessionStorage.getItem('token') === null)
  }
}
