// src/app/services/reviews.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CreateReview {
  hotelId: string;
  title: string;
  content: string;
  rating: number;
}

@Injectable({ providedIn: 'root' })
export class ReviewsService {
  private apiUrl = 'http://localhost:3004/reviews';

  constructor(private http: HttpClient) {}

  getHotelReviews(hotelId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/hotel/${hotelId}`);
  }
  
  createReview(data: CreateReview): Observable<any> {
    //Recupera Token
    const token = localStorage.getItem('accessToken');

    // Configura los headers
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    
    return this.http.post(this.apiUrl, data,{ headers });
  }

  
}