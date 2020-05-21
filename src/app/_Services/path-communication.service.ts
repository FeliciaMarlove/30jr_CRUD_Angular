import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Path} from '../_Models/path';
import {PathService} from './path-service';

@Injectable({
  providedIn: 'root'
})
export class PathCommunicationService {
  private path: BehaviorSubject<Path> = new BehaviorSubject<Path>(undefined);

  constructor(private pathService: PathService) { }

  getPath(): Observable<Path> {
    return this.path.asObservable();
  }

  updatePath(path: Path) {
    this.path.next(path);
  }
}
