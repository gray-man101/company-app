import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthService} from '../auth.service';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(err => {
      console.log('intercepted shit');
      if (401 == err.status) {
        this.authService.logout();
        location.reload();
      }

      const error = err.error.message || err.statusText;
      return throwError(error);
    }));
  }
}
