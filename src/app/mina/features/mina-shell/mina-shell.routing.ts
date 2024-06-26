import { Routes } from '@angular/router';
import { MinaShellComponent } from './mina-shell.component';

export const MinaShellRoutes: Routes = [
  {
    path: '',
    component: MinaShellComponent,
    children: [
      { path: '', redirectTo: 'pack1', pathMatch: 'full' },
      {
        path: 'pack4',
        loadComponent: () =>
          import('../mina-building/mina-building.component').then(
            (m) => m.MinaBuildingComponent
          ),
      },
      {
        path: 'pack4/:id/view',
        loadComponent: () =>
          import('../mina-floors/mina-floors.component').then(
            (m) => m.MinaFloorsComponent
          ),
      },
      {
        path: 'pack4/:id/view/:floorId/rooms',
        loadComponent: () =>
          import('../mina-rooms/mina-rooms.component').then(
            (m) => m.MinaRoomsComponent
          ),
      },
      {
        path: 'pack4/:id/view/:floorId/rooms/:roomId/beds',
        loadComponent: () =>
          import('../mina-rooms-beds/mina-rooms-beds.component').then(
            (m) => m.MinaRoomsBedsComponent
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
        path: 'distribute/:pack',
        loadComponent: () =>
          import('../mina-distribute/mina-distribute.component').then(
            (m) => m.MinaDistributeComponent
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
        path: 'pack1/create',
        loadComponent: () =>
          import('../mina-create-suite/mina-create-suite.component').then(
            (m) => m.MinaCreateSuiteComponent
          ),
      },
      {
        path: 'pack1/distribute',
        loadComponent: () =>
          import('../mina-distribute/mina-distribute.component').then(
            (m) => m.MinaDistributeComponent
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
            path: 'view/:loungeId/beds',
            loadComponent: () =>
              import('../mina-beds/mina-beds.component').then(
                (m) => m.MinaBedsComponent
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
