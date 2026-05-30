import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PrecBolsNaciService {
  private http = inject(HttpClient);
  private url = '/api/hourly';

  getPrecios(body: any): Observable<any> {
    return this.http.post(this.url, body);
  }

  getLists(body: any): Observable<any> {
    return this.http.post<any>('/api/lists', body);
  }

  getDailyMetrics(body: any): Observable<any> {
    return this.http.post<any>('/api/daily', body);
  }

}