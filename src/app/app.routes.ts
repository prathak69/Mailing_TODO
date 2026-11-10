import { Routes } from '@angular/router';
import { CountdownBadge } from './shared/components/countdown-badge/countdown-badge';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '',
  },
  {
    path: 'time',
    loadComponent: () =>
      import('./shared/components/countdown-badge/countdown-badge').then((m) => m.CountdownBadge),
  },
];
