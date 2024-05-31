import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, switchMap, map, catchError, tap } from 'rxjs';
import { environment } from '@env/environment.development';
import {
  CreateMinaPack1,
  CreateMinaPack4,
  ResponsCreateMinaPack1,
  ResponsCreateMinaPack4,
} from '@/mina/utils/types/mina.type';
import { LoggerService } from '@/shared/service/logger.service';

@Injectable({
  providedIn: 'root',
})
export class MinaService {
  private http = inject(HttpClient);
  private package1Url = `${environment.apiUrl}package1/mina`;
  private package4Url = `${environment.apiUrl}package4/mina`;
  private logger = inject(LoggerService);
  get() {
    return ['', ''];
  }
  create(payload: CreateMinaPack1 | CreateMinaPack4, pack = this.package1Url) {
    return this.http
      .post<ResponsCreateMinaPack1 | ResponsCreateMinaPack4>(
        `${pack.includes('4') ? this.package4Url : this.package1Url}/create/`,
        {
          ...payload,
        }
      )
      .pipe(
        tap((res) => this.logger.log('[create success]', res)),
        catchError((error) => {
          this.logger.error('[create error]', error);
          throw error;
        })
      );
  }
  allocate(pack = this.package1Url) {
    return this.http
      .post(
        `${pack.includes('4') ? this.package4Url : this.package1Url}/allocate/`,
        {}
      )
      .pipe(
        tap((res) => this.logger.log('[create success]', res)),
        catchError((error) => {
          this.logger.error('[create error]', error);
          throw error;
        })
      );
  }
}
