import { Routes } from '@angular/router';
import { LayoutShellComponent } from './layout-shell.component';

export const layoutShellRouting: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout-shell.component').then((m) => m.LayoutShellComponent),
    children: [
      {
        path: '',
        redirectTo: 'accommodation-mina',
        pathMatch: 'full',
      },
      {
        path: 'accommodation-mina',
        loadComponent: () =>
          import('../accommodation-mina/accommodation-mina.component').then(
            (m) => m.AccommodationMinaComponent
          ),
      },
      {
        path: 'accommodation-urafah',
        loadComponent: () =>
          import('../accommodation-urafah/accommodation-urafah.component').then(
            (m) => m.AccommodationUrafahComponent
          ),
      },
      {
        path: 'suites',
        loadComponent: () =>
          import('../suites/suites.component').then((m) => m.SuitesComponent),
      },
      {
        path: 'buses',
        loadComponent: () =>
          import('../buses/buses.component').then((m) => m.BusesComponent),
      },
      {
        path: 'cards',
        loadComponent: () =>
          import('../cards/cards.component').then((m) => m.CardsComponent),
      },
    ],
  },
];
