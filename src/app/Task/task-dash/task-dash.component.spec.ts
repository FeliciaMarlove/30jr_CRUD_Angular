import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDashComponent } from './task-dash.component';

describe('TaskDashComponent', () => {
  let component: TaskDashComponent;
  let fixture: ComponentFixture<TaskDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
