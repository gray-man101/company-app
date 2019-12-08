import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private role: string;
  authenticated: boolean;

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  getAccountInfo() {
    return this.httpClient.get('http://localhost:8080/api/account', {observe: 'response'}).toPromise()
      .then(response => {
        this.authenticated = true;
        this.role = response.body['role'];
        return response;
      }).catch((response) => {
        this.authenticated = false;
        this.role = null;
        return response;
      });
  }

  async isLoggedIn() {
    if (this.authenticated == null) {
      await this.getAccountInfo();
    }
    return this.authenticated;
  }

  // login(login: string, password: string) {
  //   const body = new HttpParams()
  //     .set('username', login)
  //     .set('password', password);
  //   this.httpClient.post(
  //     'http://localhost:8080/login',
  //     body.toString(), {
  //       headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  //     }).subscribe(
  //     (val) => {
  //       this.router.navigate(['/']);
  //     },
  //     (response) => {
  //       this.router.navigate(['/login']);
  //     }
  //   );
  // }
}
