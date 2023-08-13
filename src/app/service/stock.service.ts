import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Company } from '../model/company';
import { delay, tap } from 'rxjs/operators';
import { Stock } from '../model/stock';

const API = environment.ApiUrl;

@Injectable({ providedIn: 'root' })
export class StockService {

    private stocks: Stock[] = [
        { id: 1, name: 'ESTOQUE 1' },
        { id: 2, name: 'ESTOQUE 2' },
        { id: 3, name: 'ESTOQUE 3' },
        { id: 4, name: 'ESTOQUE 4' },
    ];

    constructor(private http: HttpClient) { }

    findById(id: number): Observable<Stock> {
        return of(this.stocks.filter(stock => stock.id === id)[0]).pipe(tap(console.log));
    }

    findByName(name: string): Observable<Stock[]> {
        const searchTerm = name.toLowerCase();
        const filteredStocks = this.stocks.filter(stock =>
            stock.name.toLowerCase().includes(searchTerm)
        );
        return of(filteredStocks).pipe(delay(500));
    }

}
