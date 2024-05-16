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
          import(
            '../../../accommodation-mina/features/accommodation-mina/accommodation-mina.component'
          ).then((m) => m.AccommodationMinaComponent),
      },
      {
        path: 'accommodation-urafah',
        loadComponent: () =>
          import(
            '../../../accommodation-urafah/features/accommodation-urafah/accommodation-urafah.component'
          ).then((m) => m.AccommodationUrafahComponent),
      },
      {
        path: 'suites',
        loadComponent: () =>
          import('../../../suites/features/suites/suites.component').then(
            (m) => m.SuitesComponent
          ),
      },
      {
        path: 'buses',
        loadChildren: () =>
          import(
            '../../../buses/features/buses-shell/buses-shell.routing'
          ).then((m) => m.BusesShellRoutes),
      },
      {
        path: 'cards',
        loadComponent: () =>
          import('../../../cards/features/cards/cards.component').then(
            (m) => m.CardsComponent
          ),
      },
    ],
  },
];
