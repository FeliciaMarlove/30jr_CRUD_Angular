import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskReadComponent } from './task-read.component';

describe('TaskReadComponent', () => {
  let component: TaskReadComponent;
  let fixture: ComponentFixture<TaskReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskReadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
