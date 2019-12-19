import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {RoleInfo} from './role-info';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private roleInfoSubject: BehaviorSubject<RoleInfo>;
  public roleInfo: Observable<RoleInfo>;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.roleInfoSubject = new BehaviorSubject<RoleInfo>(JSON.parse(localStorage.getItem('roleInfo')));
    this.roleInfo = this.roleInfoSubject.asObservable();
  }

  getCurrentUserRole(): RoleInfo {
    return this.roleInfoSubject.value;
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
        observe: 'response'
      })
      .subscribe(
        (response) => {
          this.httpClient.get('http://localhost:8080/api/role').subscribe(
            (roleInfo: RoleInfo) => {
              localStorage.setItem('roleInfo', JSON.stringify(roleInfo));
              this.roleInfoSubject.next(roleInfo);
              this.router.navigate([roleInfo.homePath]);
            },
            (response) => {
              console.log('failed to retrieve role');
              console.log(response);
              this.logout();
            }
          );
        },
        (response) => {
          console.log('failed to log in');
          console.log('POST call in error', response);
          alert('failed to log in');
        }
      );
  }

  logout() {
    localStorage.removeItem('roleInfo');
    return this.httpClient.post('http://localhost:8080/logout', null)
      .subscribe(
        (data) => {
          this.roleInfoSubject.next(null);
          this.router.navigate(['/login']);
        },
        (response) => {
          console.log('failed to log out');
          console.log('POST call in error', response);
          this.roleInfoSubject.next(null);
          this.router.navigate(['/login']);
        }
      );
  }
}
