import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Router } from '@angular/router'; // استيراد Router

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartDetails: any[] = [];
  totalPrice: number = 0;

  constructor(private _cartService: CartService, private router: Router) {} // إضافة Router هنا

  ngOnInit(): void {
    this.getCartDetails();
  }

  getCartDetails(): void {
    this._cartService.getUserCart().subscribe({
      next: (response) => {
        this.cartDetails = response;
        this.totalPrice = this._cartService.getTotalPrice(this.cartDetails);
        console.log(this.cartDetails);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  removeCartItem(productId: string): void {
    this._cartService.removeItem(productId).subscribe({
      next: (response) => {
        console.log('Item removed successfully:', response);
        // Refresh cart details after removing
        this.getCartDetails();
      },
      error: (err) => {
        console.log('Error removing item:', err);
      }
    });
  }

  increaseQuantity(item: any): void {
    this._cartService.addToCart(item.product_id.toString(), item.count + 1).subscribe({
      next: () => {
        // Refresh cart details after adding
        this.getCartDetails();
      },
      error: (err) => {
        console.log('Error adding to cart:', err);
      }
    });
  }

  decreaseQuantity(item: any): void {
    if (item.count > 1) {
      this._cartService.addToCart(item.product_id.toString(), item.count - 1).subscribe({
        next: () => {
          // Refresh cart details after subtracting
          this.getCartDetails();
        },
        error: (err) => {
          console.log('Error removing from cart:', err);
        }
      });
    }
  }

  // إضافة دالة للتوجيه إلى صفحة الدفع
  goToCheckout(): void {
    this.router.navigate(['/checkout']);
  }
}