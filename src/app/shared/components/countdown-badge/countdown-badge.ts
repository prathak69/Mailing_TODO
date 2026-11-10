import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-countdown-badge',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './countdown-badge.html',
  styleUrl: './countdown-badge.scss',
})
export class CountdownBadge implements OnInit, OnDestroy {
  @Input({ required: true }) targetIsoDate!: string;
  @Input() isDone: boolean = false;

  readonly displayText = signal<string>('Calculating...');
  readonly isExpired = signal<boolean>(false);
  private timerId: ReturnType<typeof setInterval> | null = null;

  ngOnInit(): void {
    this.tick();
    this.timerId = setInterval(() => this.tick(), 1000);
  }

  ngOnDestroy(): void {
    if (this.timerId !== null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  private tick(): void {
    if (this.isDone) {
      this.displayText.set('Completed');
      this.isExpired.set(false);
      return;
    }

    const difference = new Date(this.targetIsoDate).getTime() - Date.now();

    if (difference <= 0) {
      this.displayText.set('Expired');
      this.isExpired.set(true);
      return;
    }

    const totalSeconds = Math.floor(difference / 1000);
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    const pad = (n: number) => n.toString().padStart(2, '0');
    this.displayText.set(`${pad(hrs)}h ${pad(mins)}m ${pad(secs)}s`);
  }
}
