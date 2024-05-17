import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { LoggerService } from '../../../shared/service/logger.service';
import { Observable, tap, catchError, map } from 'rxjs';
import { LoungeMina } from '../../../shared/types/base.type';
import {
  LoungesMina,
  UpdateLoungeMina,
  CreateLoungeMina,
} from '../../utils/types/lounges-mina.type';

@Injectable({
  providedIn: 'root',
})
export class LoungeMinaService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}lounges_mina/`;
  private logger = inject(LoggerService);
  constructor() {}

  get(): Observable<LoungesMina> {
    return this.http.get<LoungesMina>(this.url);
  }

  getById(id: string): Observable<LoungeMina> {
    return this.http.get<LoungeMina>(`${this.url}/${id}`).pipe(
      tap((res) => this.logger.log('[getById success]', res)),
      catchError((error) => {
        this.logger.error('[getById error]', error);
        throw error;
      })
    );
  }
  update(data: UpdateLoungeMina): Observable<LoungeMina> {
    return this.http
      .patch<LoungeMina>(`${this.url}/${data.id}`, { data, id: data.id })
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
  create(payload: CreateLoungeMina): Observable<LoungeMina> {
    return this.http.post<{ data: LoungeMina }>(this.url, { ...payload }).pipe(
      tap((res) => this.logger.log('[create success]', res.data)),
      map(({ data }) => data),
      catchError((error) => {
        this.logger.error('[create error]', error);
        throw error;
      })
    );
  }
}
