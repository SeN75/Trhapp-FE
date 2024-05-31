import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { LoggerService } from '@/shared/service/logger.service';
import { environment } from '@env/environment.development';
import {
  DeleteAllocation,
  ManualAllocation,
  SwitchAllocation,
} from '@/pilgrim/utils/types/allocation.type';
import { catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AllocationService {
  private http = inject(HttpClient);
  private logger = inject(LoggerService);
  private url = `${environment.apiUrl}`;

  delete(payload: DeleteAllocation) {
    return this.http.post(`${this.url}delete-allocation/`, payload).pipe(
      tap((res) => this.logger.log('[delete success]', res)),
      catchError((error) => {
        this.logger.error('[delete error]', error);
        throw error;
      })
    );
  }
  switchAlocation(payload: SwitchAllocation) {
    return this.http.post(`${this.url}switch-allocation/`, payload).pipe(
      tap((res) => this.logger.log('[switch success]', res)),
      catchError((error) => {
        this.logger.error('[switch error]', error);
        throw error;
      })
    );
  }

  manual(payload: ManualAllocation) {
    return this.http.post(`${this.url}manual-allocation/`, payload).pipe(
      tap((res) => this.logger.log('[manual success]', res)),
      catchError((error) => {
        this.logger.error('[manual error]', error);
        throw error;
      })
    );
  }
}
