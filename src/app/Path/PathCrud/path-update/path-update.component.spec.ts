import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathUpdateComponent } from './path-update.component';

describe('PathUpdateComponent', () => {
  let component: PathUpdateComponent;
  let fixture: ComponentFixture<PathUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
