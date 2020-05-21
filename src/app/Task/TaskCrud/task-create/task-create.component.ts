import { Component, OnInit } from '@angular/core';
import {TaskService} from '../../../_Services/task-service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent implements OnInit {
  private form: FormGroup;

  constructor(
    private taskService: TaskService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      taskName : ['', Validators.required],
      taskShortDescription : ['', Validators.required],
      taskLongDescription : ['']
    });
  }

  onCreate() {
    this.taskService.createTask(this.form.value).subscribe( response => {
      if (!response.taskId) {
        window.alert(response.msg);
      } else {
        this.form.reset();
      }
    });
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
