import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/_Models/task';
import {TaskCommunicationService} from '../../_Services/task-communication.service';

@Component({
  selector: 'app-task-dash',
  templateUrl: './task-dash.component.html',
  styleUrls: ['./task-dash.component.scss']
})
export class TaskDashComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    
  }
}
