import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@env/environment.development';
import { LoggerService } from '@/shared/service/logger.service';
import { Observable, tap, catchError, map } from 'rxjs';

import {
  Distribute,
  DistributeRead,
  DistributePeek,
  DistributeUpdate,
} from '@/mina/utils/types/distribute.type';
@Injectable({
  providedIn: 'root',
})
export class DistributeService {
  private http = inject(HttpClient);
  private package1 = `${environment.apiUrl}package1/distribute`;
  private package4 = `${environment.apiUrl}package4/distribute`;
  private logger = inject(LoggerService);
  constructor() {}

  read(pack: 'package1' | 'package4'): Observable<DistributeRead> {
    return this.http
      .get<DistributeRead>(
        `${pack.includes('4') ? this.package4 : this.package1}/read/`
      )
      .pipe();
  }
  update(
    data: { num_employees: number },
    pack: 'package1' | 'package4'
  ): Observable<DistributeUpdate> {
    return this.http
      .post<DistributeUpdate>(
        `${pack.includes('4') ? this.package4 : this.package1}/update/`,
        { ...data }
      )
      .pipe(
        tap((res) => this.logger.log('[update success]', res)),
        catchError((error) => {
          this.logger.error('[update error]', error);
          throw error;
        })
      );
  }

  peak(
    payload: { num_employees: number },
    pack: 'package1' | 'package4'
  ): Observable<DistributePeek> {
    return this.http
      .post<{ data: DistributePeek }>(
        `${
          pack.includes('4') ? this.package4 : this.package1
        }/peak/${payload.num_employees.toString()}`,
        { ...payload }
      )
      .pipe(
        tap((res) => this.logger.log('[peak success]', res.data)),
        map(({ data }) => data),
        catchError((error) => {
          this.logger.error('[peak error]', error);
          throw error;
        })
      );
  }
}
