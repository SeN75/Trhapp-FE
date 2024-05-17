import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { LoggerService } from '../../../shared/service/logger.service';
import { Observable, tap, catchError, map } from 'rxjs';
import { Suite } from '../../../shared/types/base.type';
import {
  Suites,
  UpdateSuite,
  CreateSuite,
} from '../../utils/types/suites.type';

@Injectable({
  providedIn: 'root',
})
export class SuiteService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}suites/`;
  private logger = inject(LoggerService);
  constructor() {}

  get(): Observable<Suites> {
    return this.http.get<Suites>(this.url);
  }

  getById(id: string): Observable<Suite> {
    return this.http.get<Suite>(`${this.url}/${id}`).pipe(
      tap((res) => this.logger.log('[getById success]', res)),
      catchError((error) => {
        this.logger.error('[getById error]', error);
        throw error;
      })
    );
  }
  update(data: UpdateSuite): Observable<Suite> {
    return this.http
      .patch<Suite>(`${this.url}/${data.id}`, { data, id: data.id })
      .pipe(
        tap((res) => this.logger.log('[update success]', res)),
        catchError((error) => {
          this.logger.error('[update error]', error);
          throw error;
        })
      );
  }
  delete(id: string): Observable<null> {
    return this.http.delete<null>(`${this.url}/${id}`).pipe(
      tap((res) => this.logger.log('[delete success]', res)),
      catchError((error) => {
        this.logger.error('[delete error]', error);
        throw error;
      })
    );
  }
  create(payload: CreateSuite): Observable<Suite> {
    return this.http.post<{ data: Suite }>(this.url, { ...payload }).pipe(
      tap((res) => this.logger.log('[create success]', res.data)),
      map(({ data }) => data),
      catchError((error) => {
        this.logger.error('[create error]', error);
        throw error;
      })
    );
  }
}
