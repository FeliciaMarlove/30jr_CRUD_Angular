import { Component, OnInit } from '@angular/core';
import {TaskService} from '../../../_Services/task-service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})
/**
 * Création de tâche
 */
export class TaskCreateComponent implements OnInit {
  private form: FormGroup;

  constructor(
    private taskService: TaskService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  /**
   * Initialise un formulaire réactif avec les champs suivants :
   *  taskName (requis)
   *  taskShortDescription (requis)
   *  taskLongDescription
   */
  ngOnInit() {
    this.form = this.fb.group({
      taskName : ['', Validators.required],
      taskShortDescription : ['', Validators.required],
      taskLongDescription : ['']
    });
  }

  /**
   * Appelle la méthode de création de tâche.
   * Affiche une alerte contenant un message d'erreur si la création échoue.
   * Réinitialise le formulaire si la création réussit.
   */
  onCreate() {
    this.taskService.createTask(this.form.value).subscribe( response => {
      if (!response.taskId) {
        window.alert(response.msg);
      } else {
        this.form.reset();
      }
    });
  }

  /**
   * Annule et redirige vers la page d'affichage des tâches.
   * Exige une confirmation dans une fenêtre pop-up si le formulaire a été modifié.
   */
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
