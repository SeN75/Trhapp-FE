import { Routes } from '@angular/router';
import { RegistrationComponent } from './registration.component';

export const RegistrationRoutes: Routes = [
  {
    path: '',
    component: RegistrationComponent,
    children: [
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
    ],
  },
];
