import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PathService} from '../../../_Services/path-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-path-create',
  templateUrl: './path-create.component.html',
  styleUrls: ['./path-create.component.scss']
})
/**
 * Création de parcours
 */
export class PathCreateComponent implements OnInit {
  form: FormGroup;

  constructor(
    private pathService: PathService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  /**
   * Initialise un formulaire réactif avec les champs suivants :
   *  pathName (requis)
   *  pathShortDescription (requis)
   *  pathLongDescription
   */
  ngOnInit() {
    this.form = this.fb.group( {
      pathName : ['', Validators.required],
      pathShortDescription : ['', Validators.required],
      pathLongDescription : ['']
    });
  }

  /**
   * Appelle la méthode de création de parcours.
   * Affiche une alerte contenant un message d'erreur si la création échoue.
   * Réinitialise le formulaire si la création réussit.
   */
  onCreate() {
    this.pathService.createPath(this.form.value).subscribe( response => {
      if (!response.pathId) {
        window.alert(response.msg);
      } else {
        this.form.reset();
      }
    });
  }

  /**
   * Annule et redirige vers la page d'affichage des parcours.
   * Exige une confirmation dans une fenêtre pop-up si le formulaire a été modifié.
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
