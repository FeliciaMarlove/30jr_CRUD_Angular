import { Component, OnInit } from '@angular/core';
import {Task} from '../../_Models/task';
import {Path} from '../../_Models/path';
import {PathService} from '../../_Services/path-service';
import {PathCommunicationService} from '../../_Services/path-communication.service';

@Component({
  selector: 'app-path-tasks',
  templateUrl: './path-tasks.component.html',
  styleUrls: ['./path-tasks.component.scss']
})
/**
 * Affichage de la composition d'un parcours.
 */
export class PathTasksComponent implements OnInit {
  private tasks: Task[] = [];
  private path: Path;
  private pathLength: number;

  constructor(
    private pathService: PathService,
    private pathCommunicationService: PathCommunicationService) { }

  /**
   * Récupère le parcours sélectionné.
   * Appelle iniTasks()
   */
  ngOnInit() {
    this.pathCommunicationService.getPath().subscribe( path => {
      this.path = path;
    } );
    this.initTasks();
  }

  /**
   * Récupère les tâches du parcours et initialise sa taille.
   */
  initTasks() {
    this.pathService.getTasksOfPath(this.path.pathId).subscribe( tasks => {
      this.tasks = tasks;
      this.pathLength = this.tasks.length;
    } );
  }
}
