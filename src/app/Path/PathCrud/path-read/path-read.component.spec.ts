import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathReadComponent } from './path-read.component';

describe('PathReadComponent', () => {
  let component: PathReadComponent;
  let fixture: ComponentFixture<PathReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathReadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
