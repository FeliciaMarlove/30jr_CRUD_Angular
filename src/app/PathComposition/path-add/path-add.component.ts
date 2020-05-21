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
    // TODO : implémenter le "full" dans le template pour empêcher de sélectionner (surbrillance if !full) & vérif liste == surbrillance
    if (this.selection.length + this.tasksFromPath.length < 30) {
      if (this.selection.length > 0 && this.position !== null) {
        window.alert('Sélectionnez un seul défi pour définir une position');
        return;
      }
      if (this.selection.length > 1 && this.position !== null) {
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
    this.selection.forEach(oneTask => {
      this.pathService.addTask(this.path.pathId, oneTask.taskId, this.position ? this.position - 1 : 666).subscribe(response => {
        if (response.aBoolean === true) {
          this.router.navigateByUrl('/dashboard/path/composition/read');
        }
        if (response.aBoolean === false) {
          window.alert(response.msg);
          this.selection = [];
        }
      });
    });
  }

  onLeave() {
    this.selection = [];
    this.router.navigateByUrl('/dashboard/path/composition/read');
  }
}
