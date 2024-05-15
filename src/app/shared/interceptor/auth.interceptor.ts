import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (
    !req.url.includes('login') &&
    !req.url.includes('refresh') &&
    !req.url.includes('register')
  ) {
    let headers = req.headers;
    const token = localStorage.getItem('token');
    if (!token) return next(req);
    const newHeader = headers.append('Authorization', token);
    req = req.clone({ headers: newHeader });
    headers = req.headers;
    return next(req);
  }
  return next(req);
};
