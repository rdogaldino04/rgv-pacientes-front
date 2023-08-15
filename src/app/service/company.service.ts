import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Company } from '../model/company';
import { delay } from 'rxjs/operators';

const API = environment.ApiUrl;

@Injectable({ providedIn: 'root' })
export class CompanyService {

    private companies: Company[] = [
        { id: 1, cnpj: 71563285000117, name: 'Psicologia Inácio' },
        { id: 2, cnpj: 90512175000170, name: 'Dinis Mello Tabacaria EPP' },
        { id: 3, cnpj: 72834153000145, name: 'Mello Serravalle Pizzaria EPP' },
        { id: 4, cnpj: 16218879000182, name: 'Rodrigues Meyer Bar ME' },
    ];

    constructor(private http: HttpClient) { }

    findByCnpj(cnpj: number): Observable<Company> {
        return of(this.companies.filter(c => c.cnpj === cnpj)[0]);
    }

    findByName(name: string): Observable<Company[]> {
        const searchTerm = name.toLowerCase();
        const filteredCompanies = this.companies.filter(company =>
            company.name.toLowerCase().includes(searchTerm)
        );
        return of(filteredCompanies).pipe(delay(500));
    }

}
