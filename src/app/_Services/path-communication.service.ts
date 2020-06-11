import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Path} from '../_Models/path';
import {PathService} from './path-service';

@Injectable({
  providedIn: 'root'
})
/**
 * Service de transport de données relatives à un parcours.
 * Permet de communiquer des informations entre Components sans lien parent-enfant
 */
export class PathCommunicationService {
  private path: BehaviorSubject<Path> = new BehaviorSubject<Path>(undefined);

  constructor(private pathService: PathService) { }

  /**
   * Retourne le parcours sous forme d'Observable de type Path
   */
  getPath(): Observable<Path> {
    return this.path.asObservable();
  }

  /**
   * Met à jour le parcours
   * @param path le parcours à affecter
   */
  updatePath(path: Path) {
    this.path.next(path);
  }
}
