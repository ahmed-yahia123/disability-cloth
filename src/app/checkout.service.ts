import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // تأكد من المسار الصحيح لـ AuthService

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private apiUrl = 'http://127.0.0.1:8000/api/v1/checkout/session';

  constructor(private http: HttpClient, private authService: AuthService) { }

  createCheckoutSession(phone_number_other: string, city: string): Observable<any> {
    const token = this.authService.getToken(); // الحصول على التوكن من AuthService

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const body = {
      phone_number_other: phone_number_other,
      city: city
    };

    return this.http.post<any>(this.apiUrl, body, { headers });
  }
}
