import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TaskService} from '../../../_Services/task-service';
import { Task } from 'src/app/_Models/task';
import {TaskCommunicationService} from '../../../_Services/task-communication.service';

@Component({
  selector: 'app-task-read',
  templateUrl: './task-read.component.html',
  styleUrls: ['./task-read.component.scss']
})
export class TaskReadComponent implements OnInit {
  private tasks: Task[];
  private hasSelection: boolean;
  private selection: Task;  // for CSS binding

  constructor(private taskService: TaskService, private taskCommunicationService: TaskCommunicationService) { }

  ngOnInit() {
    this.initTasks();
  }

  initTasks() {
    this.taskService.getTasks().subscribe( tasks => this.tasks = tasks);
  }

  onSelect(task: Task) {
    this.selection = task;
    this.taskCommunicationService.updateTask(task);
    this.hasSelection = true;
  }
}
