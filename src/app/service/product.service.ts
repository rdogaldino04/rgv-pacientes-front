import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductFilter } from '../model/Product-filter';
import { Product } from '../model/product';
import { ProductPage } from '../model/product-page';

const API = environment.BASE_API;

@Injectable({ providedIn: 'root' })
export class ProductService {
  private url = `${API}/products`;

  constructor(private http: HttpClient) {}

  getProductByFilter(productFilter: ProductFilter): Observable<ProductPage> {
    const params = new HttpParams()
      .append('id', productFilter.id ? productFilter.id : '')
      .append('name', productFilter.name ? productFilter.name : '')
      .append('size', productFilter.size ? String(productFilter.size) : '5')
      .append('page', productFilter.page ? String(productFilter.page) : '0');
    return this.http.get<ProductPage>(`${this.url}`, { params });
  }

  findById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.url}/${id}`);
  }

  update(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.url}/${product.id}`, product);
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.url}`, product);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
