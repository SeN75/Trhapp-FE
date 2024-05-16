import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap, catchError, map } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { LoggerService } from '../../../shared/service/logger.service';
import {
  Locations,
  UpdateLocation,
  CreateLocation,
} from '../../utils/types/location.type';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/location/`;
  private logger = inject(LoggerService);

  get(): Observable<Locations> {
    return this.http.get<Locations>(this.url);
  }

  getById(id: string): Observable<Location> {
    return this.http.get<Location>(`${this.url}/${id}`).pipe(
      tap((res) => this.logger.log('[getById success]', res)),
      catchError((error) => {
        this.logger.error('[getById error]', error);
        throw error;
      })
    );
  }
  update(data: UpdateLocation): Observable<Location> {
    return this.http
      .patch<Location>(`${this.url}/${data.id}`, { data, id: data.id })
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
  create(payload: CreateLocation): Observable<Location> {
    return this.http.post<{ data: Location }>(this.url, { ...payload }).pipe(
      tap((res) => this.logger.log('[create success]', res.data)),
      map(({ data }) => data),
      catchError((error) => {
        this.logger.error('[create error]', error);
        throw error;
      })
    );
  }
}
