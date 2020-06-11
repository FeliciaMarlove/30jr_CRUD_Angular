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
/**
 * Requêtes AJAX vers l'API back-end (URI /admin/api/path)
 * Service parcours
 */
export class PathService {

  constructor(private http: HttpClient) { }

  /**
   * Récupère tous les parcours
   * Retourne un Observable de type array de Path
   */
  public getPaths(): Observable<Path[]> {
    return this.http.get<Path[]>(URI);
  }

  /**
   * Récupère un parcours
   * Retourne un Observable de type Path
   * @param id l'ID du parcours 
   */
  public getPath(id: number): Observable<Path> {
    return this.http.get<Path>(URI + id);
  }

  /**
   * Récupère les tâches d'un parcours
   * Retourne un Observable de type array de Task
   * @param id l'ID du parcours
   */
  public getTasksOfPath(id: number): Observable<Task[]> {
    return this.http.get<Task[]>(URI + id + '/tasks');
  }

  /**
   * Crée un parcours
   * Retourne un Observable de type any
   * @param path le parcours à créer
   */
  public createPath(path: Path): Observable<any> {
    return this.http.post(URI, path, httpOptions);
  }

  /**
   * Met à jour un parcours
   * Retourne un Observable de type any
   * @param id l'ID du parcours à modifier
   * @param path le parcours à mettre à jour
   */
  public updatePath(id: number, path: Path): Observable<any> {
    return this.http.put(URI + id, path, httpOptions);
  }

  /**
   * Désactiver un parcours
   * Retourne un Observable de type any
   * @param id l'ID du parcours à désactiver
   */
  public desactivatePath(id: number): Observable<any> {
    return this.http.delete(URI + id);
  }

  /**
   * Activer un parcours
   * Retourne un Observable de type any
   * @param id l'ID du parcours à activer
   */
  public activatePath(id: number): Observable<any> {
    return this.http.delete(URI + id + '/activate');
  }

  /**
   * Ajouter une tâche à un parcours
   * Retourne un Observable de type any
   * @param pathId l'ID du parcours
   * @param taskId l'ID de la tâche
   * @param index l'indice de position de la tâche dans le parcours
   */
  public addTask(pathId: number, taskId: number, index: number): Observable<any> {
    return this.http.get(URI + pathId + '/add/' + taskId + '/' + index);
  }

  /**
   * Retirer une tâche d'un parcours
   * Retourne un Observable de type any
   * @param pathId l'ID du parcours
   * @param taskId l'ID de la tâche
   */
  public removeTask(pathId: number, taskId: number): Observable<any> {
    return this.http.get(URI + pathId + '/remove/' + taskId);
  }
}
