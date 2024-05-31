import { Routes } from '@angular/router';
import { authGuard } from '@/shared/guard/auth.guard';

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
    canActivate: [authGuard],
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
