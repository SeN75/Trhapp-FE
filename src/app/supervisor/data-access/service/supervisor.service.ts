import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, switchMap, map, catchError, tap } from 'rxjs';
import { environment } from '@env/environment.development';
import { Supervisor } from '@/shared/types/base.type';
import {
  CreateSupervisor,
  Supervisors,
  UpdateSupervisor,
} from '@/supervisor/utils/types/supervisor.type';
import { LoggerService } from '@/shared/service/logger.service';

@Injectable({
  providedIn: 'root',
})
export class SupervisorService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}supervisors/`;
  private logger = inject(LoggerService);

  get(): Observable<Supervisors> {
    return this.http.get<Supervisors>(this.url);
  }

  getById(id: string): Observable<Supervisor> {
    return this.http.get<Supervisor>(`${this.url}/${id}`).pipe(
      tap((res) => this.logger.log('[getById success]', res)),
      catchError((error) => {
        this.logger.error('[getById error]', error);
        throw error;
      })
    );
  }
  update(data: UpdateSupervisor): Observable<Supervisor> {
    return this.http
      .patch<Supervisor>(`${this.url}/${data.id}`, { data, id: data.id })
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
  create(payload: CreateSupervisor): Observable<Supervisor> {
    return this.http.post<{ data: Supervisor }>(this.url, { ...payload }).pipe(
      tap((res) => this.logger.log('[create success]', res.data)),
      map(({ data }) => data),
      catchError((error) => {
        this.logger.error('[create error]', error);
        throw error;
      })
    );
  }
}
