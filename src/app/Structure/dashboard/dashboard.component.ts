import { Component, OnInit } from '@angular/core';
import {ConnectionService} from '../../_Services/connection-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private connectionService: ConnectionService) { }

  ngOnInit() {
  }

  authenticated() { return this.connectionService.authenticated; }

}
