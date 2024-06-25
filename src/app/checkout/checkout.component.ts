import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  phone_number_other: string = '';
  city: string = '';

  constructor(private _CheckoutService: CheckoutService, private router: Router) { }

  onSubmit() {
    this._CheckoutService.createCheckoutSession(this.phone_number_other, this.city)
      .subscribe(response => {
        console.log('Checkout session created:', response);
        // التوجيه إلى صفحة الدفع بعد إنشاء جلسة الدفع بنجاح
        this.router.navigate(['/payment']);
      }, error => {
        console.error('Error creating checkout session:', error);
      });
  }
}
