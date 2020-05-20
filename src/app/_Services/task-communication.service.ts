import { Injectable } from '@angular/core';
import {TaskService} from './task-service';
import {Task} from '../_Models/task';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskCommunicationService {
  private task: BehaviorSubject<Task> = new BehaviorSubject<Task>(undefined);

  constructor(private taskService: TaskService) {

  }

  getTask(): Observable<Task> {
    return this.task.asObservable();
  }

  updateTask(task: Task) {
    this.task.next(task);
  }
}
