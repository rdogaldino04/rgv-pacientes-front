import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StockPage } from '../model/stock-page';
import { Stock } from '../model/stock';

const API = environment.BASE_API;

@Injectable({ providedIn: 'root' })
export class StockService {
  private url = `${API}/stocks`;

  constructor(private http: HttpClient) {}

  getStockByFilter(stockFilter: {
    id?: number;
    name?: string;
    sector?: { id: number };
    size: number;
    page: number;
  }): Observable<StockPage> {
    const params = new HttpParams()
      .append('id', stockFilter.id ? stockFilter.id : '')
      .append('name', stockFilter.name ? stockFilter.name : '')
      .append(
        'sectorId',
        stockFilter.sector ? String(stockFilter.sector.id) : ''
      )
      .append('size', stockFilter.size ? String(stockFilter.size) : '5')
      .append('page', stockFilter.page ? String(stockFilter.page) : '0');
    return this.http.get<StockPage>(`${this.url}`, { params });
  }

  findByIdWithSector(id: number): Observable<Stock> {
    return this.http.get<Stock>(`${this.url}/${id}`);
  }

  update(stock: Stock): Observable<Stock> {
    return this.http.put<Stock>(`${this.url}/${stock.id}`, stock);
  }

  create(stock: Stock): Observable<Stock> {
    return this.http.post<Stock>(`${this.url}`, stock);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
