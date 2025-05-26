import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private apiUrl = 'http://localhost:3003/rooms'; //URL Backend

  constructor(private http: HttpClient) {}

  filterRoomsbyHotel(filter: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/filter`, filter);
  }
}