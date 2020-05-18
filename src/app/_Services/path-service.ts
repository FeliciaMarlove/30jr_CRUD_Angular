import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Path} from '../_Models/path';
import {Observable} from 'rxjs';
import { Task } from '../_Models/task';

const URI = 'http://localhost:8080/admin/api/path/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type' : 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class PathService {

  constructor(private http: HttpClient) { }

  public getPaths(): Observable<Path[]> {
    return this.http.get<Path[]>(URI);
  }

  public getPath(id: number): Observable<Path> {
    return this.http.get<Path>(URI + id);
  }

  public getTasksOfPath(id: number): Observable<Task[]> {
    return this.http.get<Task[]>(URI + id + '/tasks');
  }

  public createPath(path: Path): Observable<any> {
    return this.http.post(URI, path, httpOptions);
  }

  public updatePath(id: number, path: Path): Observable<any> {
    return this.http.put(URI + id, path, httpOptions);
  }

  public deletePath(id: number): Observable<any> {
    return this.http.delete(URI + id);
  }

  public addTask(pathId: number, taskId: number, index: number): Observable<any> {
    return this.http.get(URI + pathId + '/add/' + taskId + '/' + index);
  }

  public removeTask(pathId: number, taskId: number) {
    return this.http.get(URI + pathId + '/remove/' + taskId);
  }
}
