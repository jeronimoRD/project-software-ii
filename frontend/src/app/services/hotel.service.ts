import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root', 
  })
  export class HotelService {
    private apiUrl = 'http://localhost:3002/hotels'; //URL Backend
  
    constructor(private http: HttpClient) {}
 
    findHotelById(id: string): Observable<any> {
      return this.http.get(`${this.apiUrl}/${id}`);
    }

    filterHotels(hotel: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/filter`, hotel);
    }
    
    createHotel(hotelData: any) {
    return this.http.post(this.apiUrl, hotelData, { observe: 'response' });
  }

    updatePrice(hotel: any): Observable<any> {
      return this.http.patch(`${this.apiUrl}/update-prices/${hotel}`, null);
    }

    updateRating(hotel: any): Observable<any> {
      return this.http.patch(`${this.apiUrl}/update-rating/${hotel}`, null);
    }

    getHotelByAdmin(): Observable<any> {
      const token = localStorage.getItem('accessToken')!;
      const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
      return this.http.get(`${this.apiUrl}/admin/my-hotels`, { headers });
    }
}