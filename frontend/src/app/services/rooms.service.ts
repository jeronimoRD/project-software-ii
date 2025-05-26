import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private apiUrl = 'http://localhost:3003/rooms'; //URL Backend

  constructor(private http: HttpClient) {}

  createRoom(room: any): Observable<any> {
    const token = localStorage.getItem('accessToken');
    if (!token) return new Observable((observer) => {
      observer.error('No hay token');
    });
    
    if (!token)
      return new Observable((observer) => {
        observer.error('No hay token');
      });
    const tokenPayload = this.parseJwt(token);
    const id = tokenPayload?.sub;
    return this.http.post(`${this.apiUrl}`, room, id);
  }
  filterRoomsbyHotel(filter: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/filter`, filter);
  }

  private parseJwt(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(atob(base64));
    } catch (e) {
      return null;
    }
  }
}