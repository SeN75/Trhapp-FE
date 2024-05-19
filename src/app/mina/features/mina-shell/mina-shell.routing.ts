import { Routes } from '@angular/router';
import { MinaShellComponent } from './mina-shell.component';

export const MinaShellRoutes: Routes = [
  {
    path: '',
    component: MinaShellComponent,
    children: [
      { path: '', redirectTo: 'pack1', pathMatch: 'full' },
      {
        path: 'pack1',
        loadComponent: () =>
          import('../accommodation-mina/accommodation-mina.component').then(
            (m) => m.AccommodationMinaComponent
          ),
      },
      {
        path: 'tent',
        loadComponent: () =>
          import('../mina-tent/mina-tent.component').then(
            (m) => m.MinaTentComponent
          ),
      },
      {
        path: 'tent/:id',
        children: [
          {
            path: '',
            redirectTo: 'view',
            pathMatch: 'full',
          },
          {
            path: 'view',
            loadComponent: () =>
              import('../mina-view-suites/mina-view-suites.component').then(
                (m) => m.MinaViewSuitesComponent
              ),
          },
          {
            path: 'create',
            loadComponent: () =>
              import('../mina-create-suite/mina-create-suite.component').then(
                (m) => m.MinaCreateSuiteComponent
              ),
          },
        ],
      },
    ],
  },
];
