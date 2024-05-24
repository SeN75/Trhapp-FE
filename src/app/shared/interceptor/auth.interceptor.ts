import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes('api')) {
    let headers = req.headers;
    const token = JSON.parse(localStorage.getItem('token') as string) as {
      refresh: string;
      access: string;
    };
    if (!token || !token.access) return next(req);
    console.log(token.access);
    const newHeader = headers.append(
      'Authorization',
      'Bearer ' + token.access.trim()
    );
    req = req.clone({ headers: newHeader });
    console.log(req.headers);
    return next(req);
  }
  return next(req);
};
