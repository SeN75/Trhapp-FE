import { Routes } from '@angular/router';
import { ArafahShellComponent } from './arafah-shell.component';

export const ArafahShellRoutes: Routes = [
  {
    path: '',
    component: ArafahShellComponent,
    children: [
      { path: '', redirectTo: 'package1', pathMatch: 'full' },
      {
        path: ':pack',
        loadComponent: () =>
          import('@/arafah/features/arafah-tent/arafah-tent.component').then(
            (m) => m.ArafahTentComponent
          ),
      },
      {
        path: ':pack/create',
        loadComponent: () =>
          import('../arafah-create-tent/arafah-create-suite.component').then(
            (m) => m.ArafahCreateSuiteComponent
          ),
      },
      {
        path: ':pack/:id',
        loadComponent: () =>
          import(
            '@/arafah/features/arafah-tent-beds/arafah-tent-beds.component'
          ).then((m) => m.ArafahTentBedsComponent),
      },
    ],
  },
];
