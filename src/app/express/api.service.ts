import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  login(credentials) {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  register(user) {
    return this.http.post(`${this.baseUrl}/register`, user);
  }
}
