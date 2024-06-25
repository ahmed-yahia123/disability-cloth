import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLogin: boolean = false;

  constructor(private authService: AuthService, private _Router: Router) {}

  ngOnInit(): void {
    this.authService.isLoginSubject.subscribe((loggedIn: boolean) => {
      this.isLogin = loggedIn; // تعيين قيمة المتغير بناءً على حالة تسجيل الدخول
    });
  }

  logout(): void {
    this.authService.logout();
    this._Router.navigate(['/login']);
  }
}
