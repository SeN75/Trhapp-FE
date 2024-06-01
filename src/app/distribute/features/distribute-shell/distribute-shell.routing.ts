import { Routes } from '@angular/router';

export const DistributeShellRouting: Routes = [
  {
    path: '',
    loadComponent: () =>
      import(
        '@/distribute/features/distribute-shell/distribute-shell.component'
      ).then((m) => m.DistributeComponent),
    children: [
      {
        path: '',
        redirectTo: 'package1',
        pathMatch: 'full',
      },
      {
        path: ':pack',
        loadComponent: () =>
          import('@/distribute/features/distribute/distribute.component').then(
            (c) => c.DistributeComponent
          ),
      },
    ],
  },
];
