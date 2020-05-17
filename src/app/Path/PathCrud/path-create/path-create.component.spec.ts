import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathCreateComponent } from './path-create.component';

describe('PathCreateComponent', () => {
  let component: PathCreateComponent;
  let fixture: ComponentFixture<PathCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
