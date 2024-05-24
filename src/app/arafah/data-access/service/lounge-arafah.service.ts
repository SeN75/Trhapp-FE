import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { LoggerService } from '../../../shared/service/logger.service';
import { Observable, tap, catchError, map } from 'rxjs';
import { LoungeArafah } from '../../../shared/types/base.type';
import {
  LoungesArafah,
  UpdateLoungeArafah,
  CreateLoungeArafah,
} from '../../utils/types/lounges-arafah.type';

@Injectable({
  providedIn: 'root',
})
export class LoungeArafahService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}lounges-arafah/`;
  private logger = inject(LoggerService);
  constructor() {}

  get(): Observable<LoungesArafah> {
    return this.http.get<LoungesArafah>(this.url);
  }

  getById(id: string): Observable<LoungeArafah> {
    return this.http.get<LoungeArafah>(`${this.url}/${id}`).pipe(
      tap((res) => this.logger.log('[getById success]', res)),
      catchError((error) => {
        this.logger.error('[getById error]', error);
        throw error;
      })
    );
  }
  update(data: UpdateLoungeArafah): Observable<LoungeArafah> {
    return this.http
      .patch<LoungeArafah>(`${this.url}/${data.id}`, { data, id: data.id })
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
  create(payload: CreateLoungeArafah): Observable<LoungeArafah> {
    return this.http
      .post<{ data: LoungeArafah }>(this.url, { ...payload })
      .pipe(
        tap((res) => this.logger.log('[create success]', res.data)),
        map(({ data }) => data),
        catchError((error) => {
          this.logger.error('[create error]', error);
          throw error;
        })
      );
  }
}
