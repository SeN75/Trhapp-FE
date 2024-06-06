import { Routes } from '@angular/router';
import { pilgrimGuard } from '../../data-access/guard/pilgrim.guard';

export const PilgrimShellRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pilgrim-shell.component').then((m) => m.PilgrimShellComponent),
    children: [
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full',
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('../pilgrim-profile/pilgrim-profile.component').then(
            (m) => m.PilgrimProfileComponent
          ),

        canActivate: [pilgrimGuard],
      },
      {
        path: 'assmbly',
        loadComponent: () =>
          import(
            '@/pilgrim/features/pilgrim-assembly-point/pilgrim-assembly-point.component'
          ).then((m) => m.PilgrimAssemblyPointComponent),
      },
    ],
  },
];

export const PilgrimAdminShellRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pilgrim-shell.component').then((m) => m.PilgrimShellComponent),
    children: [
      {
        path: '',
        redirectTo: 'data',
        pathMatch: 'full',
      },
      {
        path: 'data',
        loadComponent: () =>
          import('../pilgrim-data/pilgrim-data.component').then(
            (m) => m.PilgrimDataComponent
          ),
      },
    ],
  },
];
