import { Component, OnInit } from '@angular/core';
import {TaskCommunicationService} from '../../../_Services/task-communication.service';
import {Task} from '../../../_Models/task';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TaskService} from '../../../_Services/task-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-task-update',
  templateUrl: './task-update.component.html',
  styleUrls: ['./task-update.component.scss']
})
export class TaskUpdateComponent implements OnInit {
  private task: Task;
  private form: FormGroup;
  private disable: boolean;

  constructor(
    private taskCommunicationService: TaskCommunicationService,
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router
  ) { }

  ngOnInit() {
    this.taskCommunicationService.getTask().subscribe( task => {
      this.task = task;
    } );
    this.form = this.fb.group( {
      taskName : [this.task.taskName, Validators.required],
      taskShortDescription : [this.task.taskShortDescription, Validators.required],
      taskLongDescription : [this.task.taskLongDescription]
    });
  }

  onUpdate() {
    this.taskService.updateTask(this.task.taskId, this.form.value).subscribe( response => {
      if (response.taskId) {
        this.taskCommunicationService.updateTask(undefined);
        this.router.navigateByUrl('/dashboard/task/read');
      } else {
        window.alert(response.msg);
      }
    } );
  }

  onActivate() {
    if (this.task.taskActive) {
      this.taskService.desactivateTask(this.task.taskId).subscribe( response => {
        if (response.taskId) {
          window.alert('Défi désactivé');
          this.disable = true;
        } else {
          window.alert(response.msg.fontcolor('red'));
        }
      });
    }
    if (!this.task.taskActive) {
      this.taskService.activateTask(this.task.taskId).subscribe( response => {
        if (response.taskId) {
          window.alert('Défi activé');
          this.disable = true;
        } else {
          window.alert(response.msg.fontcolor('red'));
        }
      });
    }
  }

  onCancel() {
    if (!this.form.pristine) {
      if (confirm('Les modifications dans le formulaire vont être perdues, continuer ?')) {
        this.router.navigateByUrl('/dashboard/task/read');
      }
    } else {
      this.router.navigateByUrl('/dashboard/task/read');
    }
  }
}
