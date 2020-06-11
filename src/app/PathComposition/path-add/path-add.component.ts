import {Component, OnInit, ViewChild} from '@angular/core';
import {Task} from '../../_Models/task';
import {Path} from '../../_Models/path';
import {PathCommunicationService} from '../../_Services/path-communication.service';
import {Router} from '@angular/router';
import {PathService} from '../../_Services/path-service';
import {TaskService} from '../../_Services/task-service';
import {flatMap, map, tap} from 'rxjs/operators';

@Component({
  selector: 'app-path-add',
  templateUrl: './path-add.component.html',
  styleUrls: ['./path-add.component.scss']
})
/**
 * Ajout de tâches dans un parcours
 */
export class PathAddComponent implements OnInit {
  private tasksActive: Task[] = [];
  private tasksFromPath: Task[] = [];
  private path: Path;
  private selection: Task[] = [];
  private position: number;
  private full: boolean;
  private conflict: boolean;

  constructor(
    private pathCommunicationService: PathCommunicationService,
    private router: Router,
    private pathService: PathService,
    private taskService: TaskService
  ) {
  }

  /**
   * Initialise selection à un tableau vide.
   * Appelle initPath()
   * Appelle initTasksActive()
   */
  ngOnInit() {
    this.selection = [];
    this.initPath();
    this.initTasksActive();
  }

  /**
   * Récupère le parcours sélectionné.
   * Récupère la liste des tâches du parcours.
   */
  initPath() {
    this.pathCommunicationService.getPath().subscribe(path => {
      this.path = path;
      this.pathService.getTasksOfPath(path.pathId).subscribe(tasks => this.tasksFromPath = tasks);
    });
  }

  /**
   * Récupère la liste des tâches dont le statut est "actif".
   */
  initTasksActive() {
    this.taskService.getTasks().subscribe(tasks => {
      tasks.forEach(task => {
        if (task.taskActive) {
          this.tasksActive.push(task);
        }
      });
    });
  }

  /**
   * Ajoute la tâche sélectionnée à la sélection.
   * Vérifie que la liste de tâche n'est pas complète (length === 30).
   * Vérifie que l'utilisateur n'essaie pas d'entrer une position lors d'une sélection multiple.
   * @param task la tâche à ajouter dans la liste
   */
  onSelect(task: Task) {
    if (this.selection.length + this.tasksFromPath.length < 30) {
      if (this.selection.length > 0 && this.position) {
        window.alert('Sélectionnez un seul défi pour définir une position');
        return;
      }
      if (this.selection.length > 1 && this.position) {
        window.alert('Sélectionnez un seul défi pour définir une position');
        this.conflict = true;
        return;
      }
      this.selection.push(task);
      if (this.selection.length + this.tasksFromPath.length === 30) {
        this.full = true;
        window.alert('Ceci était le dernier défi, le parcours est complet maintenant');
      }
    }
  }

  /**
   * Ajoute la ou les tâches sélectionnées au parcours.
   * Affiche un message d'erreur et vide la liste de tâches en cas d'échec.
   * Vide la liste de tâches et navigue vers la composition du parcours en cas de réussite.
   */
  onAdd() {
    for (const oneTask of this.selection) {
        // setTimeout(() => {
            this.pathService.addTask(this.path.pathId, oneTask.taskId, this.position ? this.position - 1 : -99)
              .subscribe(response => {
                    if (response.aBoolean === true) {
                      this.selection = [];
                      this.router.navigateByUrl('/dashboard/path/composition/read');
                    }
                    if (response.aBoolean === false) {
                      window.alert(response.msg);
                      this.selection = [];
                    }
                    // }, error => {}, () => { console.log('complete ',oneTask); }
                }
              );
         // }, 10000);
      }
  }

  /**
   * Permet d'annuler et de revenir à la composition de parcours.
   * Demande confirmation sur au moins une tâche est sélectionnée.
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
}
