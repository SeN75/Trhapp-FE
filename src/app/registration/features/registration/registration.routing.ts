import { Routes } from '@angular/router';
import { RegistrationComponent } from './registration.component';

export const RegistrationRoutes: Routes = [
  {
    path: '',
    component: RegistrationComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./../login/login.component').then((m) => m.LoginComponent),
      },
      {
        path: 'sign-up',
        loadComponent: () =>
          import('./../sign-up/sign-up.component').then(
            (m) => m.SignUpComponent
          ),
      },
      {
        path: 'pilgrim',
        loadComponent: () =>
          import('./../pilgrim/pilgrim.component').then(
            (m) => m.PilgrimComponent
          ),
      },
    ],
  },
];
