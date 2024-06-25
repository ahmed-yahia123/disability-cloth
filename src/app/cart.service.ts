import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private addCartUrl = 'http://127.0.0.1:8000/api/v1/cart/add';
  private showCartUrl = 'http://127.0.0.1:8000/api/v1/show/cart';
  private deleteCartUrl = 'http://127.0.0.1:8000/api/v1/cart/delete';

  constructor(private httpClient: HttpClient, private productsService: ProductsService) {}

  addToCart(productId: string, count: number = 1): Observable<any> {
    const token = localStorage.getItem('userToken');
    const formData = new FormData();
    formData.append('product_id', productId);
    formData.append('count', count.toString());

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log('Token:', token);
    console.log('FormData:', formData.get('product_id'), formData.get('count'));

    return this.httpClient.post(this.addCartUrl, formData, { headers }).pipe(
      map(response => {
        console.log('Add to cart response:', response);
        return response;
      })
    );
  }

  getUserCart(): Observable<any[]> {
    const token = localStorage.getItem('userToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log('Token:', token);

    return this.httpClient.get<any[]>(this.showCartUrl, { headers }).pipe(
      switchMap((cartItems: any[]) => {
        const productDetailsObservables = cartItems.map(item =>
          this.productsService.getProductsDetails(item.product_id.toString()).pipe(
            map(response => ({ ...item, product: response.data }))
          )
        );
        return forkJoin(productDetailsObservables);
      })
    );
  }

  removeItem(productId: string): Observable<any> {
    const token = localStorage.getItem('userToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const deleteData = { product_id: productId };

    return this.httpClient.request('delete', this.deleteCartUrl, { headers, body: deleteData }).pipe(
      map(response => {
        console.log('Remove item response:', response);
        return response;
      })
    );
  }

  getTotalPrice(cartItems: any[]): number {
    let totalPrice = 0;
    cartItems.forEach(item => {
      totalPrice += item.product.price * item.count;
    });
    return totalPrice;
  }
}
