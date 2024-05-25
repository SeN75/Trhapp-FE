import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'l',
    pathMatch: 'full',
  },
  {
    path: 'l',
    loadChildren: () =>
      import('./layout/features/layout-shell/layout-shell.routing').then(
        (m) => m.layoutShellRouting
      ),
  },
  {
    path: 'r',
    loadChildren: () =>
      import('./registration/features/registration/registration.routing').then(
        (m) => m.RegistrationRoutes
      ),
  },
  {
    path: 'p',
    loadChildren: () =>
      import('./pilgrim/features/pilgrim-shell/pilgrim-shell.routing').then(
        (m) => m.PilgrimShellRoutes
      ),
  },
];
