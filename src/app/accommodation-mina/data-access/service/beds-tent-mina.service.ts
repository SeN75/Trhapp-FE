import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { LoggerService } from '../../../shared/service/logger.service';
import { Observable, tap, catchError, map } from 'rxjs';
import { BedTentMina } from '../../../shared/types/base.type';
import {
  BedsTentMina,
  UpdateBedTentMina,
  CreateBedTentMina,
} from '../../utils/types/beds-tent-mina.type';

@Injectable({
  providedIn: 'root',
})
export class BedTentMinaService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}beds_tent_mina/`;
  private logger = inject(LoggerService);
  constructor() {}

  get(): Observable<BedsTentMina> {
    return this.http.get<BedsTentMina>(this.url);
  }

  getById(id: string): Observable<BedTentMina> {
    return this.http.get<BedTentMina>(`${this.url}/${id}`).pipe(
      tap((res) => this.logger.log('[getById success]', res)),
      catchError((error) => {
        this.logger.error('[getById error]', error);
        throw error;
      })
    );
  }
  update(data: UpdateBedTentMina): Observable<BedTentMina> {
    return this.http
      .patch<BedTentMina>(`${this.url}/${data.id}`, { data, id: data.id })
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
  create(payload: CreateBedTentMina): Observable<BedTentMina> {
    return this.http.post<{ data: BedTentMina }>(this.url, { ...payload }).pipe(
      tap((res) => this.logger.log('[create success]', res.data)),
      map(({ data }) => data),
      catchError((error) => {
        this.logger.error('[create error]', error);
        throw error;
      })
    );
  }
}
