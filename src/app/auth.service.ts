import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  login(login: string, password: string) {
    this.httpClient.post('http://localhost:8080/login', {'login': login, 'password': password}).subscribe(
      (val) => {
        console.log("POST call successful value returned in body", val["token"]);
        sessionStorage.setItem('token', val["token"])
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
