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
    ],
  },
];
