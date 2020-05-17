import { Component, OnInit } from '@angular/core';
import {PathService} from '../../../_Services/path-service';
import {Path} from '../../../_Models/path';

@Component({
  selector: 'app-path-read',
  templateUrl: './path-read.component.html',
  styleUrls: ['./path-read.component.scss']
})
export class PathReadComponent implements OnInit {
  private paths: Path[] = [];

  constructor(private pathService: PathService) { }

  ngOnInit() {
    this.initPaths();
  }

  public initPaths() {
    this.pathService.getPaths().subscribe( paths => this.paths = paths);
  }

}
