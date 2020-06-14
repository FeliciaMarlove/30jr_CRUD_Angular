import { Component, OnInit } from '@angular/core';
import {Path} from '../../_Models/path';
import { Task } from 'src/app/_Models/task';
import {PathCommunicationService} from '../../_Services/path-communication.service';
import {PathService} from '../../_Services/path-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-path-remove',
  templateUrl: './path-remove.component.html',
  styleUrls: ['./path-remove.component.scss']
})
/**
 * Suppression de tâches d'un parcours.
 */
export class PathRemoveComponent implements OnInit {
  private path: Path;
  private tasks: Task[] = [];
  private selection: Task[] = [];

  constructor(
    private pathCommunicationService: PathCommunicationService,
    private router: Router,
    private pathService: PathService
  ) { }

  /**
   * Initialise selection à un tableau vide.
   * Appelle initPath()
   */
  ngOnInit() {
    this.selection = [];
    this.initPath();
  }

  /**
   * Récupère le parcours sélectionné.
   * Récupère la liste de tâches du parcours.
   */
  initPath() {
    this.pathCommunicationService.getPath().subscribe( path => {
      this.path = path;
      this.pathService.getTasksOfPath(this.path.pathId).subscribe( tasks => this.tasks = tasks);
    } );
  }

  /**
   * Ajoute une tâche à la sélection.
   * @param task la tâche sélectionnée
   */
  onSelect(task: Task) {
    this.selection.push(task);
  }

  /**
   * Permet d'annuler et de revenir à la composition de parcours.
   * Demande une confirmation si au moins une tâche est sélectionnée.
   */
  onLeave() {
    if (this.selection.length > 0) {
      if (confirm('Voulez-vous quitter sans apporter les modifications ?')) {
        this.selection = [];
        this.router.navigateByUrl('/dashboard/path/composition/read');
      }
    } else {
      this.router.navigateByUrl('/dashboard/path/composition/read');
    }
  }

  /**
   * Supprime les tâches sélectionnées.
   * Affiche un message de confirmation ou d'erreur selon le résultat de l'opération.
   * Vide la sélection et navigue vers la composition en cas de réussite.
   */
  onDelete() {
    let size = this.selection.length;
    let cpt = 0;
    this.selection.forEach(task => {
      this.pathService.removeTask(this.path.pathId, task.taskId).subscribe( response => {
        size--;
        if (response.aBoolean === true) {
          cpt++;
        } else {
          window.alert(response.msg);
        }
      }, error => console.log(error), () => {
        if (size === 0) {
          if (cpt > 0) {
            window.alert(cpt + ' défi(s) supprimé(s) du parcours')
          }
          this.selection = [];
          this.router.navigateByUrl('/dashboard/path/composition/read');
        }
        }
      );
    });
  }
}
