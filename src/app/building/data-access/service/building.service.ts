import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@env/environment.development';
import { LoggerService } from '@/shared/service/logger.service';
import { Observable, tap, catchError, map } from 'rxjs';
import { Building } from '@/shared/types/base.type';
import {
  Buildings,
  UpdateBuilding,
  CreateBuilding,
} from '@/building/utils/types/building.type';

@Injectable({
  providedIn: 'root',
})
export class BuildingService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}buildings/`;
  private logger = inject(LoggerService);
  constructor() {}

  get(): Observable<Buildings> {
    return this.http
      .get<Buildings>(this.url)
      .pipe(tap((res) => this.logger.log('[get success]', res)));
  }

  getById(id: string): Observable<Building> {
    return this.http.get<Building>(`${this.url}/${id}`).pipe(
      tap((res) => this.logger.log('[getById success]', res)),
      catchError((error) => {
        this.logger.error('[getById error]', error);
        throw error;
      })
    );
  }
  update(data: UpdateBuilding): Observable<Building> {
    return this.http
      .patch<Building>(`${this.url}/${data.id}`, { data, id: data.id })
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
  create(payload: CreateBuilding): Observable<Building> {
    return this.http.post<{ data: Building }>(this.url, { ...payload }).pipe(
      tap((res) => this.logger.log('[create success]', res.data)),
      map(({ data }) => data),
      catchError((error) => {
        this.logger.error('[create error]', error);
        throw error;
      })
    );
  }
}
