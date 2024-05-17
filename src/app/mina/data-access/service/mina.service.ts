import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, switchMap, map } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class MinaService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/Mina/`;

  get(): Observable<any> {
    return this.http.get<any>(this.url);
  }

  // create(payload: CreateMina): Observable<any> {
  //   return this.http.post<Mina>(this.url, { ...payload }).pipe(
  //     switchMap((res) => this.get()),
  //     map((supervisor) => supervisor[0])
  //   );
  // }
}
