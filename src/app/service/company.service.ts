import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Company } from '../model/company';
import { delay } from 'rxjs/operators';

const API = environment.ApiUrl;

@Injectable({ providedIn: 'root' })
export class CompanyService {

    constructor(private http: HttpClient) { }

    findByCnpj(cnpj: number): Observable<Company> {
        return this.http.get<Company>(`${API}/companies/cnpj/${cnpj}`);
    }

    findByAll(name: string): Observable<Company[]> {
        return this.http.get<Company[]>(`${API}/companies?name=${name}`);
    }

}
