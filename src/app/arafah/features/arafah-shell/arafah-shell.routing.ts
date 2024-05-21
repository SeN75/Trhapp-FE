import { Routes } from '@angular/router';
import { ArafahShellComponent } from './mina-shell.component';

export const ArafahShellRoutes: Routes = [
  {
    path: '',
    component: ArafahShellComponent,
    children: [
      { path: '', redirectTo: 'tent', pathMatch: 'full' },
      {
        path: 'tent',
        loadComponent: () =>
          import('../arafah-tent/arafah-tent.component').then(
            (m) => m.ArafahTentComponent
          ),
      },
      {
        path: 'create',
        loadComponent: () =>
          import('../arafah-create-tent/arafah-create-suite.component').then(
            (m) => m.ArafahCreateSuiteComponent
          ),
      },
    ],
  },
];
