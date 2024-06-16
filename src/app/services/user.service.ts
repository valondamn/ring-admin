import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getAllUsers(): Observable<any[]> {
    return this.httpClient.get<any[]>('http://localhost:3000/api/users');
  }

  addUser(userData: any): Observable<any> {
    return this.httpClient.post<any>('http://localhost:3000/api/users/add', userData)
      .pipe(
        switchMap(() => this.getAllUsers())
      );
  }

  updateUser(userData: any): Observable<any> {
    return this.httpClient.put<any>(`http://localhost:3000/api/users/edit/${userData.id}`, userData)
      .pipe(
        switchMap(() => this.getAllUsers())
      );
  }

  deleteUser(userId: number): Observable<any> {
    return this.httpClient.delete<{ message?: string, status: string }>(`http://localhost:3000/api/users/delete/${userId}`)
      .pipe(
        switchMap((response) =>
          this.getAllUsers().pipe(
            map(users => ({ ...response, users }))
          )
        )
      );
  }
}
