import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-path-composition',
  templateUrl: './path-composition.component.html',
  styleUrls: ['./path-composition.component.scss']
})
/**
 * Container pour les Components liés aux relations parcours-tâches
 * Utilise router-outlet pour afficher dynamiquement l'écran en fonction de l'url
 */
export class PathCompositionComponent implements OnInit {
  
  constructor(

  ) { }

  ngOnInit() {

  }
}
