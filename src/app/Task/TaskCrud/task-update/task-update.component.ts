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
/**
 * Modification des tâches
 */
export class TaskUpdateComponent implements OnInit {
  task: Task;
  form: FormGroup;
  disable: boolean;

  constructor(
    private taskCommunicationService: TaskCommunicationService,
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router
  ) { }

  /**
   * Récupère la tâche sélectionnée.
   * Initialise un formulaire réactif avec les champs suivants :
   *  taskName (requis) : initialisé avec le nom de la tâche sélectionnée
   *  taskShortDescription (requis) : initialisé avec la description courte de la tâche sélectionnée
   *  taskLongDescription : initialisé avec la description longue de la tâche sélectionnée
   */
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

  /**
   * Appelle la méthode de modification de la tâche.
   * Affiche un message d'alerte en cas d'échec de la mise à jour.
   * Nettoie la tâche sélectionnée et redirige vers la liste des tâches en cas de réussite.
   */
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

  /**
   * Désactive ou active la tâche en fonction de son état initial.
   * Affiche une fenêtre indiquant la réussite ou l'échec de l'opération.
   */
  onActivate() {
    if (this.task.taskActive) {
      this.taskService.desactivateTask(this.task.taskId).subscribe( response => {
        if (response.taskId) {
          window.alert('Défi désactivé');
          this.disable = true;
        } else {
          window.alert(response.msg);
        }
      });
    }
    if (!this.task.taskActive) {
      this.taskService.activateTask(this.task.taskId).subscribe( response => {
        if (response.taskId) {
          window.alert('Défi activé');
          this.disable = true;
        } else {
          window.alert(response.msg);
        }
      });
    }
  }

  /**
   * Annule et revient à la liste des tâches.
   * Demande la confirmation de l'utilisateur si le formulaire à été modifié.
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
