import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// services/reserves.service.ts
export interface CreateReserve {
  roomId: string;
  startDate: string;
  endDate: string;
}

@Injectable({ providedIn: 'root' })
export class ReservesService {
  private apiUrl = 'http://localhost:3005/reserves';

  constructor(private http: HttpClient) {}

  createReserve(data: CreateReserve): Observable<any> {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.post(this.apiUrl, data, { headers });
  }

  findReserves(): Observable<any> {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get(this.apiUrl, { headers });
  }
}
