import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root', 
  })
  export class HotelService {
    private apiUrl = 'http://localhost:3000/hotels'; //URL Backend
  
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
}