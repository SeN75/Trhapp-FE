import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@env/environment.development';
import { LoggerService } from '@/shared/service/logger.service';
import { Observable, tap, catchError, map } from 'rxjs';
import { Floor } from '@/shared/types/base.type';
import {
  Floors,
  UpdateFloor,
  CreateFloor,
} from '@/building/utils/types/floor.type';

@Injectable({
  providedIn: 'root',
})
export class FloorService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}floors/`;
  private logger = inject(LoggerService);
  constructor() {}

  get(): Observable<Floors> {
    return this.http.get<Floors>(this.url);
  }

  getById(id: string): Observable<Floor> {
    return this.http.get<Floor>(`${this.url}/${id}`).pipe(
      tap((res) => this.logger.log('[getById success]', res)),
      catchError((error) => {
        this.logger.error('[getById error]', error);
        throw error;
      })
    );
  }
  update(data: UpdateFloor): Observable<Floor> {
    return this.http
      .patch<Floor>(`${this.url}/${data.id}`, { data, id: data.id })
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
  create(payload: CreateFloor): Observable<Floor> {
    return this.http.post<{ data: Floor }>(this.url, { ...payload }).pipe(
      tap((res) => this.logger.log('[create success]', res.data)),
      map(({ data }) => data),
      catchError((error) => {
        this.logger.error('[create error]', error);
        throw error;
      })
    );
  }
}
