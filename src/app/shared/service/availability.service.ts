import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { LoggerService } from './logger.service';
import { environment } from '@env/environment.development';
import { catchError, tap } from 'rxjs';
import { Availabilty } from '../types/availabilty.type';

@Injectable({
  providedIn: 'root',
})
export class AvailabilityService {
  private http = inject(HttpClient);
  private logger = inject(LoggerService);
  private url = `${environment.apiUrl}availability/`;

  get() {
    return this.http.get<Availabilty>(this.url).pipe(
      tap((res) => this.logger.log('[get success]', res)),
      catchError((error) => {
        this.logger.error('[get error]', error);
        throw error.error || error.details || error;
      })
    );
  }
}
