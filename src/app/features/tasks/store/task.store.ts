import { computed, inject, Injectable, signal } from '@angular/core';
import { TaskApi } from '../services/task-api';
import { TaskItem, TaskCreatePayload, TaskUpdatePayload } from '../models/task.model';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskStore {
  private readonly api = inject(TaskApi);

  readonly tasks = signal<TaskItem[]>([]);
  readonly isLoading = signal<boolean>(false);
  readonly errorMessage = signal<string | null>('');

  readonly pendingTask = computed(() => this.tasks().filter((task) => !task.is_completed));

  readonly completedTask = computed(() => this.tasks().filter((task) => task.is_completed));

  readonly missedCount = computed(
    () =>
      this.tasks().filter(
        (task) => !task.is_completed && new Date(task.due_date).getTime() <= Date.now(),
      ).length,
  );

  loadAllTasks() {
    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.api
      .getTasks()
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (res) => this.tasks.set(res),
        error: (err) => this.errorMessage.set(err?.message ?? 'Failed to load tasks'),
      });
  }

  createTask(payload: TaskCreatePayload): void {
    this.api.createTask(payload).subscribe({
      next: (res) => {
        this.tasks.update((task) =>
          [res, ...task].sort(
            (a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime(),
          ),
        );
      },
      error: (err) => this.errorMessage.set(err?.message ?? 'Failed to create tasks'),
    });
  }

  toggleComplete(id: number, isCompleted: boolean): void {
    this.api.updateTask(id, { is_completed: isCompleted }).subscribe({
      next: (res) => {
        this.tasks.update((tasks) => tasks.map((item) => (item.id === id ? res : item)));
      },
      error: (err) => this.errorMessage.set(err?.message ?? 'Failed to update tasks'),
    });
  }

  deleteTask(id: number): void {
    this.api.deleteTask(id).subscribe({
      next: () => {
        this.tasks.update((tasks) => tasks.filter((item) => item.id !== id));
      },
      error: (err) => this.errorMessage.set(err?.message ?? 'Failed to delete tasks'),
    });
  }
}
