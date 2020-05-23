import { Component, OnInit } from '@angular/core';
import {PathService} from '../../../_Services/path-service';
import {Path} from '../../../_Models/path';
import {PathCommunicationService} from '../../../_Services/path-communication.service';

@Component({
  selector: 'app-path-read',
  templateUrl: './path-read.component.html',
  styleUrls: ['./path-read.component.scss']
})
export class PathReadComponent implements OnInit {
  private paths: Path[] = [];
  private hasSelection: boolean;
  private selection: Path; // for CSS binding

  constructor(private pathService: PathService, private pathCommunicationService: PathCommunicationService) { }

  ngOnInit() {
    this.initPaths();
  }

  public initPaths() {
    this.pathService.getPaths().subscribe( paths => this.paths = paths);
  }

  onSelect(path: Path) {
    this.selection = path;
    this.pathCommunicationService.updatePath(path);
    this.hasSelection = true;
  }

}
