import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {AccountInfo} from './customer/account-info';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private accountInfoSubject: BehaviorSubject<AccountInfo>;
  public accountInfo: Observable<AccountInfo>;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.accountInfoSubject = new BehaviorSubject<AccountInfo>(JSON.parse(localStorage.getItem('accountInfo')));
    this.accountInfo = this.accountInfoSubject.asObservable();
  }

  getCurrentUserValue(): AccountInfo {
    return this.accountInfoSubject.value;
  }

  hasRole(role: string) {
    if (!this.accountInfoSubject.value) {
      return false;
    }

    return this.accountInfoSubject.value.role == role;
  }

  login(username: string, password: string) {
    const body = new HttpParams()
      .set('username', username)
      .set('password', password);
    return this.httpClient.post(
      'http://localhost:8080/login',
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded'),
        observe: 'response',
        withCredentials: true,
      })
      .subscribe(
        (response) => {
          console.log('response');
          console.log(response);
          this.httpClient.get('http://localhost:8080/api/account', {withCredentials: true}).subscribe(
            (data: AccountInfo) => {
              localStorage.setItem('accountInfo', JSON.stringify(data));
              this.accountInfoSubject.next(data);
              this.router.navigate(['/']);
            },
            (response) => {
              console.log('failed to log in');
              console.log(response);
              this.logout();
            }
          );
        },
        (response) => {
          alert('failed to log in ' + response);
        }
      );
  }

  logout() {
    localStorage.removeItem('accountInfo');
    this.accountInfoSubject.next(null);
    this.router.navigate(['/login'])
  }
}
