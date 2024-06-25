import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'http://127.0.0.1:8000/api/v1/product';

  constructor(private _HttpClient: HttpClient) {}

  getAllProducts(): Observable<{ data: Product[] }> {
    return this._HttpClient.get<{ data: Product[] }>(`${this.apiUrl}/All_Product`);
  }

  getProductsDetails(id: string): Observable<{ data: Product }> {
    return this._HttpClient.get<{ data: Product }>(`${this.apiUrl}/details?id=${id}`);
  }
}
