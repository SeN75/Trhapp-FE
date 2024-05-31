import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@env/environment.development';
import { LoggerService } from '@/shared/service/logger.service';
import { Observable, tap, catchError, map } from 'rxjs';
import { Room } from '@/shared/types/base.type';
import {
  Rooms,
  UpdateRoom,
  CreateRoom,
} from '@/building/utils/types/rooms.type';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}rooms/`;
  private logger = inject(LoggerService);
  constructor() {}

  get(): Observable<Rooms> {
    return this.http.get<Rooms>(this.url);
  }

  getById(id: string): Observable<Room> {
    return this.http.get<Room>(`${this.url}/${id}`).pipe(
      tap((res) => this.logger.log('[getById success]', res)),
      catchError((error) => {
        this.logger.error('[getById error]', error);
        throw error;
      })
    );
  }
  update(data: UpdateRoom): Observable<Room> {
    return this.http
      .patch<Room>(`${this.url}/${data.id}`, { data, id: data.id })
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
  create(payload: CreateRoom): Observable<Room> {
    return this.http.post<{ data: Room }>(this.url, { ...payload }).pipe(
      tap((res) => this.logger.log('[create success]', res.data)),
      map(({ data }) => data),
      catchError((error) => {
        this.logger.error('[create error]', error);
        throw error;
      })
    );
  }
}
