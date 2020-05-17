import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathDashComponent } from './path-dash.component';

describe('PathDashComponent', () => {
  let component: PathDashComponent;
  let fixture: ComponentFixture<PathDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
