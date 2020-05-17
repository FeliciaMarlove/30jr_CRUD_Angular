import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathCompositionComponent } from './path-composition.component';

describe('PathCompositionComponent', () => {
  let component: PathCompositionComponent;
  let fixture: ComponentFixture<PathCompositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathCompositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathCompositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
