import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { catchError, tap } from 'rxjs';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root',
})
export class UploadOpsService {
  private http = inject(HttpClient);
  private url = `${environment.opsUrl}/upload`;
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
}
