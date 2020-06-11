import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-path-dash',
  templateUrl: './path-dash.component.html',
  styleUrls: ['./path-dash.component.scss']
})
/**
 * Container pour les Components liés aux parcours
 * Utilise router-outlet pour afficher dynamiquement l'écran en fonction de l'url
 */
export class PathDashComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
