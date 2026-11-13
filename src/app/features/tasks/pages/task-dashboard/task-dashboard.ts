import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { TaskStore } from '../../store/task.store';
import { timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TaskCreatePayload } from '../../models/task.model';
import { TaskCard } from '../../components/task-card/task-card';
import { TaskFormDialog } from '../../components/task-form-dialog/task-form-dialog';

@Component({
  selector: 'app-task-dashboard',
  imports: [TaskCard, TaskFormDialog],
  templateUrl: './task-dashboard.html',
  styleUrl: './task-dashboard.scss',
})
export class TaskDashboard implements OnInit {
  readonly store = inject(TaskStore);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    timer(0, 3000)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.store.loadAllTasks());
  }

  handleCreate(payload: TaskCreatePayload): void {
    this.store.createTask(payload);
  }
  handleToggle(id: number, status: boolean): void {
    this.store.toggleComplete(id, status);
  }
  handleDelete(id: number): void {
    this.store.deleteTask(id);
  }
}
