import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable, map, switchMap } from 'rxjs';
import { Buses, CreateBus } from '../../utils/types/buses.type';
import { Bus } from '../../../shared/types/base.type';

@Injectable({
  providedIn: 'root',
})
export class BusesService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/buses/`;

  get(): Observable<Buses> {
    return this.http.get<Buses>(this.url);
  }

  create(payload: CreateBus): Observable<Bus> {
    return this.http.post<Buses>(this.url, { ...payload }).pipe(
      switchMap((res) => this.get()),
      map((buses) => buses[0])
    );
  }
}
