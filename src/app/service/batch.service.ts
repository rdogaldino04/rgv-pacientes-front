import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Batch } from '../model/batch';
import { BatchPage } from '../model/batch-page';

const API = environment.BASE_API;

@Injectable({ providedIn: 'root' })
export class BatchService {
  private url = `${API}/batchies`;

  constructor(private http: HttpClient) {}

  findAll(bathFilter: {
    id?: number;
    batchNumber?: string;
    size?: number;
    page?: number;
    product?: { id: number };
  }): Observable<BatchPage> {
    const params = new HttpParams()
      .append('id', bathFilter.id ? bathFilter.id : '')
      .append(
        'batchNumber',
        bathFilter.batchNumber ? bathFilter.batchNumber : ''
      )
      .append('size', bathFilter.size ? String(bathFilter.size) : '5')
      .append('page', bathFilter.page ? String(bathFilter.page) : '0')
      .append(
        'productId',
        bathFilter.product?.id ? bathFilter?.product.id : ''
      );
    return this.http.get<BatchPage>(`${this.url}`, { params });
  }

  findById(id: number): Observable<Batch> {
    return this.http.get<Batch>(`${this.url}/${id}`);
  }

  update(batch: Batch): Observable<Batch> {
    return this.http.put<Batch>(`${this.url}/${batch.id}`, batch);
  }

  create(batch: Batch): Observable<Batch> {
    return this.http.post<Batch>(`${this.url}`, batch);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
