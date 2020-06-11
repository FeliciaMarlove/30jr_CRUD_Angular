import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../_Models/user';
import {Observable} from 'rxjs';

const URI = 'http://localhost:8080/connection/';

@Injectable({
  providedIn: 'root'
})
/**
 * Requêtes AJAX vers l'API back-end (URI /connection)
 * Service de connexion
 */
export class ConnectionService {
  authenticated = false;

  constructor(private http: HttpClient) {

  }

  /**
   * Tente une connexion à l'application et enregistre le code Basic 64 dans une variable de session.
   * Définit le code Basic 64.
   * Retourne un Observable de type User.
   * @param user l'utilisateur (e-mail et mot de passe)
   */
  public connect(user: User): Observable<User> {
    sessionStorage.setItem('auth', btoa(user.email + ':' + user.password));
    return this.http.post<User>(URI + 'connect', user);
  }
}
