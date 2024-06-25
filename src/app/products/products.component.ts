import { Component } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../product';
import { CartService } from '../cart.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
constructor(private _ProductsService:ProductsService ,private _CartService:CartService) {}
products:Product[]=[]

  ngOnInit(): void {
    this._ProductsService.getAllProducts().subscribe({
      next: (response) => {
        this.products = response.data;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
  }

  addToCart(productId: string): void {
    this._CartService.addToCart(productId).subscribe({
      next: (response) => {
        console.log('Added to cart:', response);
        // يمكنك إضافة رسالة نجاح للمستخدم هنا إذا لزم الأمر
      },
      error: (err) => {
        console.error('Error adding to cart:', err);
        if (err.status === 401) {
          console.log('Unauthorized: Please log in.');
          // يمكنك إضافة إجراءات لإعادة توجيه المستخدم إلى صفحة تسجيل الدخول هنا
        }
      }
    });
  }
}
