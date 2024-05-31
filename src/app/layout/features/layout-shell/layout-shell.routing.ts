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
        redirectTo: 'mina',
        pathMatch: 'full',
      },
      {
        path: 'mina',
        loadChildren: () =>
          import('@/mina/features/mina-shell/mina-shell.routing').then(
            (m) => m.MinaShellRoutes
          ),
      },
      {
        path: 'arafah',
        loadChildren: () =>
          import('@/arafah/features/arafah-shell/arafah-shell.routing').then(
            (m) => m.ArafahShellRoutes
          ),
      },
      {
        path: 'suites',
        loadComponent: () =>
          import('@/suites/features/suites/suites.component').then(
            (m) => m.SuitesComponent
          ),
      },
      {
        path: 'buses',
        loadChildren: () =>
          import('@/buses/features/buses-shell/buses-shell.routing').then(
            (m) => m.BusesShellRoutes
          ),
      },
      {
        path: 'cards',
        loadComponent: () =>
          import('@/cards/features/cards/cards.component').then(
            (m) => m.CardsComponent
          ),
      },
      {
        path: 'pilgrims',
        loadChildren: () =>
          import('@/pilgrim/features/pilgrim-shell/pilgrim-shell.routing').then(
            (m) => m.PilgrimAdminShellRoutes
          ),
      },
    ],
  },
];
