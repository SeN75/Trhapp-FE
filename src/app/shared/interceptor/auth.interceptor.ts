import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { catchError, of, switchMap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  if (req.url.includes('/api/') || req.url.includes('/ops/')) {
    let headers = req.headers;
    const token = auth.token;
    if (!token || !token.access) return next(req);
    const newHeader = headers.append(
      'Authorization',
      'Bearer ' + token.access.trim()
    );
    req = req.clone({ headers: newHeader });

    return next(req).pipe(
      catchError((error) => {
        console.log(error);
        if (error.status === 401) return handle401Error(req, next);
        throw error;
      })
    );
  }
  return next(req);
};

const handle401Error = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const servcie = inject(AuthService);
  return servcie.refreshToken().pipe(
    switchMap(({ access }) => {
      const newHeader = req.headers.append(
        'Authorization',
        'Bearer ' + access.trim()
      );
      req = req.clone({ headers: newHeader });
      return next(req);
    }),
    catchError((error) => {
      servcie.logout();
      throw of(error);
    })
  );
};
