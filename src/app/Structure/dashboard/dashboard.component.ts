import { Component, OnInit } from '@angular/core';
import {ConnectionService} from '../../_Services/connection-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
 /**
 * Container pour les Components du tableau de bord
 * Utilise router-outlet pour afficher dynamiquement l'écran en fonction de l'url
 */
export class DashboardComponent implements OnInit {

  constructor(private connectionService: ConnectionService, private router: Router) { }

  ngOnInit() {
  }

  /**
   * Permet à l'utilisateur de se déconnecter de l'application.
   * Nettoie la variable de session et redirige vers la page d'accueil.
   */
  public logout() {
    this.connectionService.authenticated = false;
    sessionStorage.setItem('auth', undefined);
    sessionStorage.removeItem('auth');
    sessionStorage.clear();
    this.router.navigateByUrl('/');
  }

}
