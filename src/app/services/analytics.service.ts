import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {


  private apiUrl = 'http://localhost:3000/api/analytics';

  constructor(private http: HttpClient) {
  }

  getDailyRevenue(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/daily-revenue`);
  }

  getWeeklyRevenue(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/weekly-revenue`);
  }

  getMonthlyRevenue(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/monthly-revenue`);
  }


}
