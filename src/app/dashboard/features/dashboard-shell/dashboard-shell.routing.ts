import { Routes } from '@angular/router';

export const DashboardShellRouters: Routes = [
  {
    path: '',
    loadComponent: () =>
      import(
        '@/dashboard/features/dashboard-shell/dashboard-shell.component'
      ).then((m) => m.DashboardShellComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            '@/dashboard/features/dashboard-data/dashboard-data.component'
          ).then((m) => m.DashboardDataComponent),
      },
    ],
  },
];
