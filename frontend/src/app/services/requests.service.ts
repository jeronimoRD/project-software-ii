// src/app/services/requests.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export enum RequestStatus {
  UNDER_REVIEW = 'under_review',
  APPROVED = 'approved',
  REJECTED = 'rejected'
}

export interface RequestItem {
  id: string;
  reserveId: string;
  adminId: string;
  status: RequestStatus;
  createdAt: string;
}

export interface ResponseRequestDto {
  requestId: string;
  status: RequestStatus;
}

@Injectable({ providedIn: 'root' })
export class RequestsService {
  private apiUrl = 'http://localhost:3006/requests';

  constructor(private http: HttpClient) {}

  showRequests(): Observable<RequestItem[]> {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<RequestItem[]>(`${this.apiUrl}/admin`, { headers });
  }

  respondRequest(dto: ResponseRequestDto): Observable<void> {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.patch<void>(`${this.apiUrl}/status`, dto, { headers });
  }
}
