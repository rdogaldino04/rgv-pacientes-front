import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Sector } from '../model/sector';
import { Stock } from '../model/stock';
import { SectorFilter } from '../model/sector-filter';
import { tap } from 'rxjs/operators';

const API = environment.ApiUrl;

@Injectable({ providedIn: 'root' })
export class SectorService {

    private url = `${API}/sectors`;

    constructor(private http: HttpClient) { }

    findById(id: number): Observable<Sector> {
        return this.http.get<Sector>(`${this.url}/${id}`);
    }

    getAll(name: string): Observable<Sector[]> {
        return this.http.get<Sector[]>(`${this.url}?name=${name}`);
    }

    stocksFindBySector(sectorId: number, sectorFilter: SectorFilter): Observable<Stock[]> {
        const params = new HttpParams()
          .append('stockName', sectorFilter.stockName ? sectorFilter.stockName : '')
          .append('stockId', sectorFilter.stockId ? sectorFilter.stockId : '')
        return this.http.get<Stock[]>(`${this.url}/${sectorId}/stocks`, { params }).pipe(tap(console.log));
    }

}
