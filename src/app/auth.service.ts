import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

interface AccountDataInterface {
  name?: string;
  email?: string;
  password?: string;
  password_confirm?: string; // تم تعديل اسم هذا الحقل
  phone_number?: string;
  resetCode?: string;
  newPassword?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://e-commerce-production-d31c.up.railway.app/api/v1/user/auth';

  // BehaviorSubject to track login status
  isLoginSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) {
    this.checkLoginStatus();
  }

  // Register API
  registerAPI(data: AccountDataInterface): Observable<any> {
    return this.httpClient.post(`https://e-commerce-production-d31c.up.railway.app/api/v1/user/auth/register`, data);
  }

  // Login API
  loginAPI(data: AccountDataInterface): Observable<any> {
    return this.httpClient.post(`http://127.0.0.1:8000/api/v1/user/auth/login`, data);
  }

  // Forgot password API
  forgetAPI(data: AccountDataInterface): Observable<any> {
    return this.httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', data);
  }

  // API للتحقق من الكود
  verifyCode(data: AccountDataInterface): Observable<any> {
    return this.httpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, data);
  }

  // API لتعيين كلمة المرور الجديدة
  newPass(data: AccountDataInterface): Observable<any> {
    return this.httpClient.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, data);
  }

  // Save user data after login
  saveUserData(token: string): void {
    localStorage.setItem('userToken', token);
    this.updateLoginStatus(true);
  }

  // Update login status
  private updateLoginStatus(status: boolean): void {
    this.isLoginSubject.next(status);
  }

  // Check login status on page load
  checkLoginStatus(): void {
    const token = localStorage.getItem('userToken');
    if (token) {
      this.updateLoginStatus(true);
    } else {
      this.updateLoginStatus(false);
    }
  }

  // Load user data from token
  loadUserData(): any {
    const token = localStorage.getItem('userToken');
    if (token) {
      return jwtDecode(token);
    }
    return null;
  }

  // Logout
  logout(): void {
    localStorage.removeItem('userToken');
    this.updateLoginStatus(false);
  }

  // Get token
  getToken(): string | null {
    return localStorage.getItem('userToken');
  }
}
