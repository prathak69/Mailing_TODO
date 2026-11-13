import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskCreatePayload } from '../../models/task.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-form-dialog',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './task-form-dialog.html',
  styleUrl: './task-form-dialog.scss',
})
export class TaskFormDialog {
  private readonly fb = inject(FormBuilder);
  @Output() taskSubmit = new EventEmitter<TaskCreatePayload>();

  readonly form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
    description: ['', [Validators.required, Validators.maxLength(1000)]],
    due_date: ['', [Validators.required]],
    alert_email: ['', [Validators.required, Validators.email]],
  });

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    const val = this.form.value;

    this.taskSubmit.emit({
      title: val.title!.trim(),
      description: val.description ? val.description.trim() : undefined,
      due_date: new Date(val.due_date!).toISOString(),
      alert_email: val.alert_email!.trim(),
    });

    this.form.reset();
  }
}
