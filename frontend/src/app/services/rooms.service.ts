import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private apiUrl = 'http://localhost:3003/rooms'; //URL Backend

  constructor(private http: HttpClient) {}

  createRoom(room: any): Observable<any> {
    const token = localStorage.getItem('accessToken')!;
      const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.post(`${this.apiUrl}`, room, { headers });
  }

  filterRoomsbyHotel(filter: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/filter`, filter);
  }
}