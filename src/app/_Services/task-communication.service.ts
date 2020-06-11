import { Injectable } from '@angular/core';
import {TaskService} from './task-service';
import {Task} from '../_Models/task';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/**
 * Service de transport de données relatives à une tâche.
 * Permet de communiquer des informations entre Components sans lien parent-enfant
 */
export class TaskCommunicationService {
  private task: BehaviorSubject<Task> = new BehaviorSubject<Task>(undefined);

  constructor(private taskService: TaskService) {

  }

  /**
   * Retourne la tâche sous forme d'Observable de type Task
   */
  getTask(): Observable<Task> {
    return this.task.asObservable();
  }

  /**
   * Met à jour la tâche
   * @param task la tâche à affecter
   */
  updateTask(task: Task) {
    this.task.next(task);
  }
}
