import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';
import { Product } from '../product';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  productDetails: Product = {} as Product;

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ProductsService: ProductsService,
    private _cartService: CartService
  ) {}

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        let idproduct: any = params.get('id');
        this._ProductsService.getProductsDetails(idproduct).subscribe({
          next: (Response) => {
            this.productDetails = Response.data;
          },
          error: (err) => {
            console.error('Error fetching product details:', err);
          }
        });
      }
    });
  }

  addToCart(productId: string): void {
    console.log('Adding to cart:', productId);
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
