import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@env/environment.development';
import { catchError, map, switchMap, tap } from 'rxjs';
import { LoggerService } from './logger.service';
import { City } from '../types/base.type';
import { BatchesRes } from '../types/upload-operations.type';

@Injectable({
  providedIn: 'root',
})
export class UploadOpsService {
  private http = inject(HttpClient);
  private url = `${environment.opsUrl}upload/`;
  private logger = inject(LoggerService);
  upload(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(this.url, formData).pipe(
      tap((res) => this.logger.log('[upload res] => ', res)),
      catchError((error) => {
        this.logger.error('[upload res error] => ', error);
        throw error;
      })
    );
  }

  cardBatches({
    package_name,
    city,
  }: {
    package_name: string;
    city: Omit<City, 'id'>;
  }) {
    return this.http
      .post<BatchesRes>(`${this.url.replace('upload', 'batches')}`, {
        package_name,
        city,
      })
      .pipe(
        tap((res) => this.logger.log('[upload res] => ', res)),
        map((data) => data),
        catchError((error) => {
          this.logger.error('[upload res error] => ', error);
          throw error;
        })
      );
  }
  sendBatchReqeust({
    package_name,
    city,
    batch_number,
  }: {
    package_name: string;
    city: Omit<City, 'id'>;
    batch_number: number;
  }) {
    return this.http
      .post<unknown>(`${this.url.replace('upload', 'send-batch-request')}`, {
        package_name,
        city,
        batch_number,
      })
      .pipe(
        tap((res) => this.logger.log('[send-batch res] => ', res)),

        switchMap((payload: any) =>
          this.http.post(
            'http://164.92.227.93:120/api/report',
            {
              ...payload.payload,
            },
            { responseType: 'text' }
          )
        ),
        tap((res) => {
          const wn = window.open('', '_blank');
          if (wn) {
            wn.document.open();
            wn.document.write(res);
            wn.document.close();
          }
          this.logger.log('[js res] => ');
        })
      );
  }
}
