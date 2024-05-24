import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable, catchError, map, switchMap, take, tap } from 'rxjs';
import { Buses, CreateBus, UpdateBus } from '../../utils/types/buses.type';
import { Bus } from '../../../shared/types/base.type';
import { LoggerService } from '../../../shared/service/logger.service';

@Injectable({
  providedIn: 'root',
})
export class BusesService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}buses/`;
  private logger = inject(LoggerService);
  get(): Observable<Buses> {
    return this.http.get<Buses>(this.url);
  }
  getById(id: string): Observable<Bus> {
    return this.http.get<Bus>(`${this.url}/${id}`).pipe(
      tap((res) => this.logger.log('[getById success]', res)),
      catchError((error) => {
        this.logger.error('[getById error]', error);
        throw error;
      })
    );
  }
  update(data: UpdateBus): Observable<Bus> {
    return this.http
      .patch<Bus>(`${this.url}/${data.id}`, { data, id: data.id })
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
  create(payload: CreateBus): Observable<Bus> {
    return this.http.post<{ data: Bus }>(this.url, { ...payload }).pipe(
      tap((res) => this.logger.log('[create success]', res.data)),
      map(({ data }) => data),
      catchError((error) => {
        this.logger.error('[create error]', error);
        throw error;
      })
    );
  }
}
