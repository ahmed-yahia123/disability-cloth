import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../product';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];

  constructor(private _productsService: ProductsService, private _cartService: CartService) {}


  ngOnInit(): void {
    this._productsService.getAllProducts().subscribe({
      next: (response) => {
        this.products = response.data;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
  }

  addToCart(productId: string): void {
    this._cartService.addToCart(productId).subscribe({
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