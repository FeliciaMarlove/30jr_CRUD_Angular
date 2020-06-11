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
/**
 * Requêtes AJAX vers l'API back-end (URI /admin/api/task)
 * Service tâche
 */
export class TaskService {

  constructor(private http: HttpClient) { }

  /**
   * Récupère toutes les tâches
   * Retourne un Observable de type array de Task
   */
  public getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(URI);
  }

  /**
   * Récupère une tâche
   * Retourne un Observale de type Task
   * @param id l'ID de la tâche
   */
  public getTask(id: number): Observable<Task> {
    return this.http.get<Task>(URI + id);
  }

  /**
   * Crée une tâche   
   * Retourne un Observable de type any
   * @param task la tâche à créer
   */
  public createTask(task: Task): Observable<any> {
    return this.http.post(URI, task, httpOptions);
  }

  /**
   * Met à jour la tâche
   * Retourne un Observable de type any
   * @param id ID de la tâche à modifier
   * @param task la tâche à mettre à jour
   */
  public updateTask(id: number, task: Task): Observable<any> {
    return this.http.put(URI + id, task, httpOptions);
  }

  /**
   * Désactive une tâche
   * Retourne un Observable de type any
   * @param id l'ID de la tâche à désactiver
   */
  public desactivateTask(id: number): Observable<any> {
    return this.http.delete(URI + id);
  }

  /**
   * Active une tâche
   * Retourne un Observable de type any
   * @param id l'ID de la tâche à activer
   */
  public activateTask(id: number): Observable<any> {
    return this.http.delete(URI + id + '/activate');
  }
}
