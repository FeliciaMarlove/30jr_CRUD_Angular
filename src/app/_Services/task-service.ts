/* tslint:disable */
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Task } from '../_Models/task';

const URI = 'http://localhost:8080/admin/api/task/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type' : 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  public getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(URI);
  }

  public getTask(id: number): Observable<Task> {
    return this.http.get<Task>(URI + id);
  }

  public createTask(task: Task): Observable<any> {
    return this.http.post(URI, task, httpOptions);
  }

  public updateTask(id: number, task: Task): Observable<any> {
    return this.http.put(URI + id, task, httpOptions);
  }

  public desactivateTask(id: number): Observable<any> {
    return this.http.delete(URI + id);
  }

  public activateTask(id: number): Observable<any> {
    return this.http.delete(URI + id + '/activate');
  }
}
