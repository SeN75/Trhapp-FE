import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@env/environment.development';
import { LoggerService } from '@/shared/service/logger.service';
import { Observable, tap, catchError, map } from 'rxjs';
import { BedBuidingMina } from '@/shared/types/base.type';
import {
  BedsBuidingMina,
  UpdateBedBuidingMina,
  CreateBedBuidingMina,
} from '@/mina/utils/types/beds-building-mina.type';

@Injectable({
  providedIn: 'root',
})
export class BedBuildingMinaService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}beds_building_mina/`;
  private logger = inject(LoggerService);
  constructor() {}

  get(): Observable<BedsBuidingMina> {
    return this.http.get<BedsBuidingMina>(this.url);
  }

  getById(id: string): Observable<BedBuidingMina> {
    return this.http.get<BedBuidingMina>(`${this.url}/${id}`).pipe(
      tap((res) => this.logger.log('[getById success]', res)),
      catchError((error) => {
        this.logger.error('[getById error]', error);
        throw error;
      })
    );
  }
  update(data: UpdateBedBuidingMina): Observable<BedBuidingMina> {
    return this.http
      .patch<BedBuidingMina>(`${this.url}/${data.id}`, { data, id: data.id })
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
  create(payload: CreateBedBuidingMina): Observable<BedBuidingMina> {
    return this.http
      .post<{ data: BedBuidingMina }>(this.url, { ...payload })
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
