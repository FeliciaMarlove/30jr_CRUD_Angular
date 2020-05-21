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
export class PathUpdateComponent implements OnInit {
  private path: Path;
  private form: FormGroup;
  private disable: boolean;

  constructor(
    private pathCommunicationService: PathCommunicationService,
    private fb: FormBuilder,
    private pathService: PathService,
    private router: Router
  ) { }

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
