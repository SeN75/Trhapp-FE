import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ArafahService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/accommodation-urafah`;

  get() {
    return [''];
  }
}
