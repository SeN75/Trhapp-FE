import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, tap } from 'rxjs';
import { Auth } from '../types/base.type';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment.development';
import { LoggerService } from './logger.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = new BehaviorSubject<Auth>({} as Auth);
  private router = inject(Router);
  private cookie = inject(CookieService);
  refreshSubject = new BehaviorSubject<Auth | null>({} as Auth);
  isRefersh = false;
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
    const data = this.cookie.get('TP-Auth');
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
      .post<Auth>(`${this.URL}login/`, { phone_number, password })
      .pipe(
        tap(({ access, refresh }) => {
          this.setToken = { access, refresh };
          this.auth.next({ access, refresh });
        }),
        catchError((error) => {
          this.logger.error(error);
          return error;
        })
      );
  }
  signUp({
    phone_number,
    password,
    registration_code,
  }: {
    phone_number: string;
    password: string;
    registration_code: string;
  }) {
    return this.http
      .post<Auth>(`${this.URL}register/`, {
        phone_number,
        password,
        registration_code,
      })
      .pipe(
        tap(({ access, refresh }) => {
          // localStorage.setItem('token', JSON.stringify({ access, refresh }));
          // this.auth.next({ access, refresh });
        }),
        catchError((error) => {
          this.logger.error(error);
          return error;
        })
      );
  }
  set setToken(token: { access: string; refresh: string }) {
    this.cookie.set('TP-Auth', JSON.stringify(token), {
      expires: new Date(new Date().setDate(new Date().getDate() + 1)),
    });
  }
  get token() {
    const _token = JSON.parse(this.cookie.get('TP-Auth') || '{}') as Auth;
    return _token;
  }

  logout() {
    this.cookie.delete('TP-Auth');
    this.auth.next({} as Auth);
    this.router.navigate(['/', 'r', 'login']);
  }
  refreshToken(): Observable<Auth> {
    return this.http
      .post<Auth>(`${this.URL}refresh/`, {
        refresh: this.token.refresh,
      })
      .pipe(
        map(({ access, refresh }) => {
          return { access, refresh } as Auth;
        }),
        tap(({ access, refresh }) => {
          this.setToken = { access, refresh };
          this.auth.next({ access, refresh });
        }),
        catchError((error) => {
          this.logger.error(error);
          throw error;
        })
      );
  }
}
