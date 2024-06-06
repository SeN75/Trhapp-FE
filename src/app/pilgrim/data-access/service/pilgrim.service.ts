import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@env/environment.development';
import { LoggerService } from '@/shared/service/logger.service';
import { Observable, tap, catchError, map } from 'rxjs';
import { Pilgrim } from '@/shared/types/base.type';
import {
  Pilgrims,
  UpdatePilgrim,
  CreatePilgrim,
} from '@/pilgrim/utils/types/pilgrim.type';

@Injectable({
  providedIn: 'root',
})
export class PilgrimService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}pilgrims/`;
  private pUrl = `${environment.pilgrimUrl}`;
  private logger = inject(LoggerService);
  constructor() {}

  get(): Observable<Pilgrims> {
    return this.http.get<Pilgrims>(this.url);
  }

  getById(id: string): Observable<Pilgrim> {
    return this.http.get<Pilgrim>(`${this.url}/${id}/`).pipe(
      tap((res) => this.logger.log('[getById success]', res)),
      catchError((error) => {
        this.logger.error('[getById error]', error);
        throw error;
      })
    );
  }
  update(data: UpdatePilgrim): Observable<Pilgrim> {
    return this.http
      .patch<Pilgrim>(`${this.url}/${data.id}/`, { data, id: data.id })
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
  create(payload: CreatePilgrim): Observable<Pilgrim> {
    return this.http.post<{ data: Pilgrim }>(this.url, { ...payload }).pipe(
      tap((res) => this.logger.log('[create success]', res.data)),
      map(({ data }) => data),
      catchError((error) => {
        this.logger.error('[create error]', error);
        throw error;
      })
    );
  }
  uploadImage(id: string, file: File) {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.put(`${this.pUrl}${id}/update_picture/`, formData).pipe(
      tap((res) => this.logger.log('[uploadImage success]', res)),
      catchError((error) => {
        this.logger.error('[uploadImage error]', error);
        throw error;
      })
    );
  }

  login({ national_id }: { national_id: string }) {
    return this.http.post<Pilgrim>(`${this.pUrl}login/`, { national_id }).pipe(
      tap((res) => this.logger.log('[login success]', res)),
      map((data) => data),
      catchError((error) => {
        this.logger.error('[login error]', error);
        throw error;
      })
    );
  }
}
