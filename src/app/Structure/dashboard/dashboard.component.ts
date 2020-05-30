import { Component, OnInit } from '@angular/core';
import {ConnectionService} from '../../_Services/connection-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private connectionService: ConnectionService, private router: Router) { }

  ngOnInit() {
  }

  public logout() {
    this.connectionService.authenticated = false;
    sessionStorage.setItem('auth', undefined);
    sessionStorage.removeItem('auth');
    sessionStorage.clear();
    this.router.navigateByUrl('/');
  }

}
