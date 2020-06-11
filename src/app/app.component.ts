import { Component } from '@angular/core';
import {ConnectionService} from './_Services/connection-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
/**
 * Boot.
 */
export class AppComponent {
  title = 'Interface d\'administration : 30 jours pour désencombrer';

  constructor(private app: ConnectionService) {
   
  }
}
