import { Component, OnInit } from '@angular/core';
import {PathService} from '../../../_Services/path-service';
import {Path} from '../../../_Models/path';
import {PathCommunicationService} from '../../../_Services/path-communication.service';

@Component({
  selector: 'app-path-read',
  templateUrl: './path-read.component.html',
  styleUrls: ['./path-read.component.scss']
})
/**
 * Affiche les parcours
 */
export class PathReadComponent implements OnInit {
  paths: Path[] = [];
  hasSelection: boolean;
  selection: Path; // for CSS binding

  constructor(private pathService: PathService, private pathCommunicationService: PathCommunicationService) { }

  /**
   * Appelle initPaths().
   */
  ngOnInit() {
    this.initPaths();
  }

  /**
   * Récupère la liste des parcours et la liste des tâches pour chaque parcours.
   */
  public initPaths() {
    this.pathService.getPaths().subscribe( paths => {
      this.paths = paths;
      this.paths.forEach( path => {
        this.pathService.getTasksOfPath(path.pathId).subscribe( tasks => {
          path.tasks = tasks;
        });
      });
    });
  }

  /**
   * Sélectionne un parcours
   * @param path le parcours sélectionné
   */
  onSelect(path: Path) {
    this.selection = path;
    this.pathCommunicationService.updatePath(path);
    this.hasSelection = true;
  }

}
