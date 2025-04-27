import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root', 
  })
  export class UserService {
    private apiUrl = 'http://localhost:3001/users'; //URL Backend
  
    constructor(private http: HttpClient) {}
 
    register(user: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/signup`, user);
    }
} 