import { Component, OnInit } from '@angular/core';
import {Path} from '../../../_Models/path';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PathCommunicationService} from '../../../_Services/path-communication.service';
import {PathService} from '../../../_Services/path-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-path-update',
  templateUrl: './path-update.component.html',
  styleUrls: ['./path-update.component.scss']
})
/**
 * Modification des parcours
 */
export class PathUpdateComponent implements OnInit {
  path: Path;
  form: FormGroup;
  disable: boolean;

  constructor(
    private pathCommunicationService: PathCommunicationService,
    private fb: FormBuilder,
    private pathService: PathService,
    private router: Router
  ) { }

  /**
   * Récupère le parcours sélectionné.
   * Initialise un formulaire réactif avec les champs suivants :
   *  pathName (requis) : initialisé avec le nom du parcours sélectionné
   *  pathShortDescription (requis) : initialisé avec la description courte du parcours sélectionné
   *  pathLongDescription : initialisé avec la description longue du parcours sélectionné
   */
  ngOnInit() {
    this.pathCommunicationService.getPath().subscribe( path => {
      this.path = path;
    });
    this.form = this.fb.group( {
      pathName : [this.path.pathName, Validators.required],
      pathShortDescription : [this.path.pathShortDescription, Validators.required],
      pathLongDescription : [this.path.pathLongDescription]
    });
  }

  /**
   * Appelle la méthode de modification du parcours.
   * Affiche un message d'alerte en cas d'échec de la mise à jour.
   * Nettoie le parcours sélectionné et redirige vers la liste des parcours en cas de réussite.
   */
  onUpdate() {
    this.pathService.updatePath(this.path.pathId, this.form.value).subscribe( response => {
      if (response.pathId) {
        this.pathCommunicationService.updatePath(undefined);
        this.router.navigateByUrl('/dashboard/path/read');
      } else {
        window.alert(response.msg);
      }
    });
  }

  /**
   * Désactive ou active le parcours en fonction de son état initial.
   * Affiche une fenêtre indiquant la réussite ou l'échec de l'opération.
   */
  onActivate() {
    if (this.path.pathActive) {
      this.pathService.desactivatePath(this.path.pathId).subscribe( response => {
        if (response.pathId) {
          window.alert('Parcours désactivé');
          this.disable = true;
        } else {
          window.alert(response.msg.fontcolor('red'));
        }
      });
    }
    if (!this.path.pathActive) {
      this.pathService.activatePath(this.path.pathId).subscribe( response => {
        if (response.pathId) {
          window.alert('Parcours activé');
          this.disable = true;
        } else {
          window.alert(response.msg.fontcolor('red'));
        }
      });
    }
  }

  /**
   * Annule et revient à la liste des parcours.
   * Demande la confirmation de l'utilisateur si le formulaire à été modifié.
   */
  onCancel() {
    if (!this.form.pristine) {
      if (confirm('Les modifications dans le formulaire vont être perdues, continuer ?')) {
        this.router.navigateByUrl('/dashboard/path/read');
      }
    } else {
      this.router.navigateByUrl('/dashboard/path/read');
    }
  }
}
