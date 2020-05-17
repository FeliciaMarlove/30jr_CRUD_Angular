import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathRemoveComponent } from './path-remove.component';

describe('PathRemoveComponent', () => {
  let component: PathRemoveComponent;
  let fixture: ComponentFixture<PathRemoveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathRemoveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
