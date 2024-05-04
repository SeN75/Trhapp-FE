import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, switchMap, map } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { Supervisor } from '../../../shared/types/base.type';
import {
  CreateSupervisor,
  Supervisors,
} from '../../utils/types/supervisor.type';

@Injectable({
  providedIn: 'root',
})
export class SupervisorService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/supervisor/`;

  get(): Observable<Supervisors> {
    return this.http.get<Supervisors>(this.url);
  }

  create(payload: CreateSupervisor): Observable<Supervisor> {
    return this.http.post<Supervisor>(this.url, { ...payload }).pipe(
      switchMap((res) => this.get()),
      map((supervisor) => supervisor[0])
    );
  }
}
