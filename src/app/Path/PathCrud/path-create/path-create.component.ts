import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PathService} from '../../../_Services/path-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-path-create',
  templateUrl: './path-create.component.html',
  styleUrls: ['./path-create.component.scss']
})
export class PathCreateComponent implements OnInit {
  private form: FormGroup;

  constructor(
    private pathService: PathService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.fb.group( {
      pathName : ['', Validators.required],
      pathShortDescription : ['', Validators.required],
      pathLongDescription : ['']
    });
  }

  onCreate() {
    this.pathService.createPath(this.form.value).subscribe( response => {
      if (!response.pathId) {
        window.alert(response.msg);
      } else {
        this.form.reset();
      }
    });
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
