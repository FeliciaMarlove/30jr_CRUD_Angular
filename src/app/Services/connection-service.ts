import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../Models/user';
import {Observable} from 'rxjs';

const URI = 'http://localhost:8080/connection/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type' : 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  constructor(private http: HttpClient) { }

  public connect(user: User): Observable<any> {
    return this.http.post<User>(URI + 'connect', user);
  }
}
