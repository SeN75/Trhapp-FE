import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@env/environment.development';
import { LoggerService } from '@/shared/service/logger.service';
import { Observable, tap, catchError, map } from 'rxjs';
import { BedTentArafah } from '@/shared/types/base.type';
import {
  BedsTentArafah,
  UpdateBedTentArafah,
  CreateBedTentArafah,
} from '@/arafah/utils/types/beds-tent-arafah.type';

@Injectable({
  providedIn: 'root',
})
export class BedTentArafahService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}beds_tent_arafah/`;
  private logger = inject(LoggerService);
  constructor() {}

  get(): Observable<BedsTentArafah> {
    return this.http.get<BedsTentArafah>(this.url);
  }

  getById(id: string): Observable<BedTentArafah> {
    return this.http.get<BedTentArafah>(`${this.url}/${id}`).pipe(
      tap((res) => this.logger.log('[getById success]', res)),
      catchError((error) => {
        this.logger.error('[getById error]', error);
        throw error;
      })
    );
  }
  update(data: UpdateBedTentArafah): Observable<BedTentArafah> {
    return this.http
      .patch<BedTentArafah>(`${this.url}/${data.id}`, { data, id: data.id })
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
  create(payload: CreateBedTentArafah): Observable<BedTentArafah> {
    return this.http
      .post<{ data: BedTentArafah }>(this.url, { ...payload })
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
