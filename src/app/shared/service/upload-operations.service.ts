import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@env/environment.development';
import { catchError, map, switchMap, tap } from 'rxjs';
import { LoggerService } from './logger.service';
import { City } from '../types/base.type';
import { BatchesRes, UploadOpsRes } from '../types/upload-operations.type';

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
    return this.http.post<UploadOpsRes>(this.url, formData).pipe(
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
  exportPack4() {
    return this.http
      .get(`${this.url.replace('upload', 'export-package4')}`, {
        responseType: 'blob',
      })
      .pipe(
        tap((res) => this.logger.log('[upload res] => ', res)),
        tap((res) => {
          const a = document.createElement('a');
          const objectUrl = URL.createObjectURL(res);
          const now = new Date();
          const day = String(now.getDate()).padStart(2, '0');
          const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
          const year = now.getFullYear();
          const hours = String(now.getHours()).padStart(2, '0');
          const minutes = String(now.getMinutes()).padStart(2, '0');
          a.href = objectUrl;
          a.download = `pilgrim-data-package4-${day}-${month}-${year}-${hours}:${minutes}.xlsx`;
          a.click();
          URL.revokeObjectURL(objectUrl);
        }),
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
            'https://report-alelyani.trhapp.net/api/report',
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
