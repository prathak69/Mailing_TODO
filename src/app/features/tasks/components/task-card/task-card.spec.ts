import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCard } from './task-card';

describe('TaskCard', () => {
  let component: TaskCard;
  let fixture: ComponentFixture<TaskCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCard],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskCard);
    component = fixture.componentInstance;
    component.task = {
      id: 1,
      title: 'Test',
      description: 'Test',
      due_date: '2026-11-13T12:00:00Z',
      alert_email: 'test@example.com',
      is_completed: false,
      is_missed: false,
      missed_email_sent: false,
      created_at: '2026-11-13T11:00:00Z',
    };
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
