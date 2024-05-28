import { Routes } from '@angular/router';
import { ArafahShellComponent } from './arafah-shell.component';

export const ArafahShellRoutes: Routes = [
  {
    path: '',
    component: ArafahShellComponent,
    children: [
      { path: '', redirectTo: 'pack1', pathMatch: 'full' },
      {
        path: 'pack1',
        loadComponent: () =>
          import('../arafah-tent/arafah-tent.component').then(
            (m) => m.ArafahTentComponent
          ),
      },

      {
        path: 'pack1/create',
        loadComponent: () =>
          import('../arafah-create-tent/arafah-create-suite.component').then(
            (m) => m.ArafahCreateSuiteComponent
          ),
      },
    ],
  },
];
