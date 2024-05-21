import { Routes } from '@angular/router';
import { MinaShellComponent } from './mina-shell.component';

export const MinaShellRoutes: Routes = [
  {
    path: '',
    component: MinaShellComponent,
    children: [
      // { path: '', redirectTo: 'pack1', pathMatch: 'full' },
      // {
      //   path: 'pack1',
      //   loadComponent: () =>
      //     import('../accommodation-mina/accommodation-mina.component').then(
      //       (m) => m.AccommodationMinaComponent
      //     ),
      // },
      {
        path: 'pack4',
        loadComponent: () =>
          import('../mina-building/mina-building.component').then(
            (m) => m.MinaBuildingComponent
          ),
      },
      {
        path: 'pack4/create',
        loadComponent: () =>
          import('../mina-create-building/mina-create-building.component').then(
            (m) => m.MinaCreateBuildingComponent
          ),
      },
      {
        path: 'pack1',
        loadComponent: () =>
          import('../mina-tent/mina-tent.component').then(
            (m) => m.MinaTentComponent
          ),
      },
      {
        path: 'pack1/:id',
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
