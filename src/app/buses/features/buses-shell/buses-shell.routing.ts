import { Routes } from '@angular/router';
import { BusesShellComponent } from './buses-shell.component';

export const BusesShellRoutes: Routes = [
  {
    path: '',
    component: BusesShellComponent,
    children: [
      { path: '', redirectTo: 'view', pathMatch: 'full' },
      {
        path: 'view',
        title: 'الحافلات',
        loadComponent: () =>
          import('../buses/buses.component').then((m) => m.BusesComponent),
      },
      {
        path: 'create',
        title: 'انشاء حافلة جديدة',
        loadComponent: () =>
          import('../buses-create/buses-create.component').then(
            (m) => m.BusesCreateComponent
          ),
      },
    ],
  },
];
