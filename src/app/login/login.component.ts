import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 isloading: boolean = false;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/)
    ])
  });

  loginSubmit(): void {
    this.isloading = true;
    this.authService.loginAPI(this.loginForm.value).subscribe({
      next: (res: any) => {
        this.isloading = false;
        if (res.message === "success") {
          localStorage.setItem("userToken", res.token);
          this.authService.saveUserData(res.token); // حفظ بيانات المستخدم بعد تسجيل الدخول
          this.router.navigate(['/home']);
        }
      },
      error: (err: any) => {
        this.errorMessage = err.error.message;
        this.isloading = false;
      }
    });
  }
}
