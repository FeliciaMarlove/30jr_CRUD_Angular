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
export class PathRemoveComponent implements OnInit {
  private path: Path;
  private tasks: Task[] = [];
  private selection: Task[] = [];

  constructor(
    private pathCommunicationService: PathCommunicationService,
    private router: Router,
    private pathService: PathService
  ) { }

  ngOnInit() {
    this.selection = [];
    this.initPath();
  }

  initPath() {
    this.pathCommunicationService.getPath().subscribe( path => {
      this.path = path;
      this.pathService.getTasksOfPath(this.path.pathId).subscribe( tasks => this.tasks = tasks);
    } );
  }

  onSelect(task: Task) {
    this.selection.push(task);
  }

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

  onDelete() {
    this.selection.forEach(task => {
      this.pathService.removeTask(this.path.pathId, task.taskId).subscribe( response => {
        if (response.aBoolean === true) {
          this.selection = [];
          this.router.navigateByUrl('/dashboard/path/composition/read');
        } else {
          window.alert(response.msg);
        }
      });
    });
  }
}
