import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { catchError, map, tap } from 'rxjs';
import { LoggerService } from '../../../shared/service/logger.service';
import {
  CreateArafahPack1,
  ResponsCreatePack1,
} from '../../utils/types/arafah.type';

@Injectable({
  providedIn: 'root',
})
export class ArafahService {
  private http = inject(HttpClient);
  private logger = inject(LoggerService);
  private package1Url = `${environment.apiUrl}package1/arafah`;
  private package4Url = `${environment.apiUrl}package4/arafah`;

  get() {
    return ['', ''];
  }
  create(payload: CreateArafahPack1, pack = this.package1Url) {
    return this.http
      .post<ResponsCreatePack1>(
        `${pack.includes('4') ? this.package4Url : this.package1Url}/create/`,
        { ...payload }
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
