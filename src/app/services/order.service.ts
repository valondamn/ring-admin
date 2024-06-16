import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:3000/api/orders';

  constructor(private http: HttpClient) {
  }



  getAllOrders(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  getOrderById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addOrder(order: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/new`, order);
  }

  updateOrder(id: number, order: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, order);
  }

  deleteOrder(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  makePayment(orderId: number, paymentInfo: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/payment`, {orderId, ...paymentInfo});
  }

}
