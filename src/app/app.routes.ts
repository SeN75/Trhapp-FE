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
];
