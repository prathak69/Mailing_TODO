import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskItem } from '../../models/task.model';
import { CountdownBadge } from '../../../../shared/components/countdown-badge/countdown-badge';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-card',
  imports: [CountdownBadge, CommonModule],
  templateUrl: './task-card.html',
  styleUrl: './task-card.scss',
})
export class TaskCard {
  @Input({ required: true }) task!: TaskItem;
  @Output() toggleCompletion = new EventEmitter<boolean>();
  @Output() delete = new EventEmitter<void>();
}
