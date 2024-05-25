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
    ],
  },
];
