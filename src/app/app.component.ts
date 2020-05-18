import { Component } from '@angular/core';
import {ConnectionService} from './_Services/connection-service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Interface d\'administration : 30 jours pour désencombrer';

  constructor(private app: ConnectionService) {
    this.app.connect(undefined);
  }
}
