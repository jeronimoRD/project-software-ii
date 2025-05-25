import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root', 
  })
  export class UserService {
    private apiUrl = 'http://localhost:3001/users'; //URL Backend
  
    constructor(private http: HttpClient) {}
 
    register(user: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/`, user);
    }
    
    login(user: any) {
    return this.http.post<{ accessToken: string, refreshToken: string }>(
      `${this.apiUrl}/login`,
      user
    ).pipe(
      tap(tokens => {
        //Limpiar Cache
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        //Guardar tokens
        localStorage.setItem('accessToken', tokens.accessToken); 
        localStorage.setItem('refreshToken', tokens.refreshToken); 
      })
    );
  }
}