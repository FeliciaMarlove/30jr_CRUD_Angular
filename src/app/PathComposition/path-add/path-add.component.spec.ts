import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathAddComponent } from './path-add.component';

describe('PathAddComponent', () => {
  let component: PathAddComponent;
  let fixture: ComponentFixture<PathAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
