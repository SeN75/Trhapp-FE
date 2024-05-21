import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, catchError, map, tap } from 'rxjs';
import { Auth } from '../types/base.type';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = new BehaviorSubject<Auth>({} as Auth);
  get auth$() {
    return this.auth.asObservable();
  }

  URL = environment.authUrl;
  private http = inject(HttpClient);
  private logger = inject(LoggerService);
  constructor() {
    this.getAuth();
  }
  getAuth() {
    const data = localStorage['token'] as string;
    return data ? (JSON.parse(data) as Auth) : null;
  }
  login({
    phone_number,
    password,
  }: {
    phone_number: string;
    password: string;
  }) {
    return this.http
      .post<Auth>(`${this.URL}login`, { phone_number, password })
      .pipe(
        tap(({ access, refresh }) => {
          localStorage.setItem('token', JSON.stringify({ access, refresh }));
          this.auth.next({ access, refresh });
        }),
        catchError((error) => {
          this.logger.error(error);
          return error;
        })
      );
  }
}
