import {Component, OnInit, ViewChild} from '@angular/core';
import {Task} from '../../_Models/task';
import {Path} from '../../_Models/path';
import {PathCommunicationService} from '../../_Services/path-communication.service';
import {Router} from '@angular/router';
import {PathService} from '../../_Services/path-service';
import {TaskService} from '../../_Services/task-service';

@Component({
  selector: 'app-path-add',
  templateUrl: './path-add.component.html',
  styleUrls: ['./path-add.component.scss']
})
export class PathAddComponent implements OnInit {
  private tasksActive: Task[] = [];
  private tasksFromPath: Task[] = [];
  private path: Path;
  private selection: Task[] = [];
  //TODO  : compris entre 1 et la dernière positions dispo dans l'array (affiché)
  // + gérer l'effacement (check si effacer = rien)
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

  ngOnInit() {
    this.initPath();
    this.initTasksActive();
  }

  initPath() {
    this.pathCommunicationService.getPath().subscribe(path => {
      this.path = path;
      this.pathService.getTasksOfPath(path.pathId).subscribe(tasks => this.tasksFromPath = tasks);
    });
  }

  initTasksActive() {
    this.taskService.getTasks().subscribe(tasks => {
      tasks.forEach(task => {
        if (task.taskActive) {
          this.tasksActive.push(task);
        }
      });
    });
  }

  onSelect(task: Task) {
    //TODO : implémenter le "full" dans le template pour empêcher de sélectionner (surbrillance if !full) & vérif liste == surbrillance
    // + msg alerte si position et sélec > 1 && disable bouton
    // contrôler les comportements avec la case position !
    if (this.selection.length + this.tasksFromPath.length < 30) {
      if (this.selection.length > 1 && this.position !== undefined) {
        window.alert('Sélectionnez un seul défi pour définir une position');
        this.conflict = true;
        return;
      }
      this.selection.push(task);
      if (this.selection.length + this.tasksFromPath.length === 30) {
        this.full = true;
        window.alert('Ceci était le dernier défi, le parcours est complement maintenant'); }
    }
  }

  onAdd() {
    //TODO gestion réponse + navig
    // + check comportement back si deux fois mm dans la liste
    // ! DB scabreuse, create drop & recommencer tout début pour test
    console.log(this.position ? this.position : 666)
    this.selection.forEach(oneTask => {
      this.pathService.addTask(this.path.pathId, oneTask.taskId, this.position ? this.position : 666).subscribe(response => {
        console.log(response);
      });
    });
  }
}
