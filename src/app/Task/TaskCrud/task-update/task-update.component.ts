import { Component, OnInit } from '@angular/core';
import {TaskCommunicationService} from '../../../_Services/task-communication.service';
import {Task} from '../../../_Models/task';

@Component({
  selector: 'app-task-update',
  templateUrl: './task-update.component.html',
  styleUrls: ['./task-update.component.scss']
})
export class TaskUpdateComponent implements OnInit {
  private task: Task;

  constructor(private taskCommunicationService: TaskCommunicationService) { }

  ngOnInit() {
    this.taskCommunicationService.getTask().subscribe( task => {
      this.task = task;
      console.log('UPDATE ', this.task)
    } );
  }

}
