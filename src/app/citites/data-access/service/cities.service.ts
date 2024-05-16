import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap, catchError, map } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { LoggerService } from '../../../shared/service/logger.service';
import { Cities, UpdateCity, CreateCity } from '../../utils/types/cities.type';
import { City } from '../../../shared/types/base.type';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/cities/`;
  private logger = inject(LoggerService);

  get(): Observable<Cities> {
    return this.http.get<Cities>(this.url);
  }

  getById(id: string): Observable<City> {
    return this.http.get<City>(`${this.url}/${id}`).pipe(
      tap((res) => this.logger.log('[getById success]', res)),
      catchError((error) => {
        this.logger.error('[getById error]', error);
        throw error;
      })
    );
  }
  update(data: UpdateCity): Observable<City> {
    return this.http
      .patch<City>(`${this.url}/${data.id}`, { data, id: data.id })
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
  create(payload: CreateCity): Observable<City> {
    return this.http.post<{ data: City }>(this.url, { ...payload }).pipe(
      tap((res) => this.logger.log('[create success]', res.data)),
      map(({ data }) => data),
      catchError((error) => {
        this.logger.error('[create error]', error);
        throw error;
      })
    );
  }
}
