import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class XhrInterceptor implements HttpInterceptor {

  /**
   * Clone les headers pour toutes les requêtes http (Basic auth)
   * @param req
   * @param next
   */
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const xhr = req.clone({
      headers: req.headers.set('authorization', 'Basic ' + sessionStorage.getItem('auth'))
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
