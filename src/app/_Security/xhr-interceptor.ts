import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class XhrInterceptor implements HttpInterceptor {

  /**
   * clone les headers pour les requêtes http
   * @param req
   * @param next
   */
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const xhr = req.clone({
      headers: req.headers.set('authorization', 'Basic ' + localStorage.getItem('auth'))
    });
    return next.handle(xhr);
  }

  /*
  Note : pour inclure plusieurs headers (au lieu de "headers:") :
  setHeaders: {
        'Content-Type' : 'application/json; charset=utf-8',
        'Accept'       : 'application/json',
        'Authorization': `Bearer ${AuthService.getToken()}`,
      },
   */

}
