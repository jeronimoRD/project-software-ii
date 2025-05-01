import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root', 
  })
  export class UserService {
    private apiUrl = 'http://localhost:3002/hotels'; //URL Backend
  
    constructor(private http: HttpClient) {}
 
    filterHotels(hotel: any): Observable<any> {
        return this.http.get(`${this.apiUrl}/filter`, hotel);
    }
}