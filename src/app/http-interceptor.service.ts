import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (sessionStorage.getItem("token") !== null) {
      const dupReq = req.clone({setHeaders: {"X-Auth-Token": sessionStorage.getItem("token")}}) //Cookie
      return next.handle(dupReq);
    }

    return next.handle(req)
  }
}
