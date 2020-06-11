import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/_Models/task';
import {TaskCommunicationService} from '../../_Services/task-communication.service';

@Component({
  selector: 'app-task-dash',
  templateUrl: './task-dash.component.html',
  styleUrls: ['./task-dash.component.scss']
})
/**
 * Container pour les Components liés aux tâches
 * Utilise router-outlet pour afficher dynamiquement l'écran en fonction de l'url
 */
export class TaskDashComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    
  }
}
