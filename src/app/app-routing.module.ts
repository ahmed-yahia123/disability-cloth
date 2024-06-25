// app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ContactComponent } from './contact/contact.component';
import { ForgetPassComponent } from './forget-pass/forget-pass.component';
import { ResetPassComponent } from './reset-pass/reset-pass.component';
import { forgetPassGuard } from './forget-pass.guard';
import { verifyCodeGuard } from './verify-code.guard';
import { VerifyCodeComponent } from './verify-code/verify-code.component';
import { CustomizeComponent } from './customize/customize.component';
import { DetailsComponent } from './details/details.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PaymentComponent } from './payment/payment.component'; // استيراد PaymentComponent
import { PhotoComponent } from './photo/photo.component'; // استيراد PhotoComponent

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'customize', component: CustomizeComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: 'forgetPass', component: ForgetPassComponent },
  { path: 'resetPass', component: ResetPassComponent, canActivate: [verifyCodeGuard] },
  { path: 'verifyCode', component: VerifyCodeComponent, canActivate: [forgetPassGuard] },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'payment', component: PaymentComponent }, // مسار صفحة الدفع
  { path: 'photo', component: PhotoComponent }, // مسار صفحة الصور (مثال)
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
