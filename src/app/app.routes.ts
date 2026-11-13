import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '',
  },
  {
    path: '',
    loadComponent: () =>
      import('./features/tasks/pages/task-dashboard/task-dashboard').then((m) => m.TaskDashboard),
  },
];
