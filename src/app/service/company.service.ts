import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Company } from '../model/company';
import { CompanyPage } from '../model/company-page';
import { tap } from 'rxjs/operators';

const API = environment.BASE_API;

@Injectable({ providedIn: 'root' })
export class CompanyService {
  private url = `${API}/companies`;

  constructor(private http: HttpClient) {}

  findByCnpj(cnpj: number): Observable<Company> {
    return this.http.get<Company>(`${API}/companies/cnpj/${cnpj}`);
  }

  getAll(companyFilter: {
    id?: number;
    cnpj?: string;
    name?: string;
    size?: number;
    page?: number;
  }): Observable<CompanyPage> {
    const params = {
      id: companyFilter.id ? companyFilter.id : '',
      cnpj: companyFilter.cnpj ? companyFilter.cnpj : '',
      name: companyFilter.name ? companyFilter.name : '',
      size: companyFilter.size ? String(companyFilter.size) : '5',
      page: companyFilter.page ? String(companyFilter.page) : '0',
    };
    return this.http.get<CompanyPage>(`${this.url}/`, { params });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  findById(id: number): Observable<Company> {
    return this.http.get<Company>(`${this.url}/${id}`);
  }

  create(company: Company): Observable<Company> {
    return this.http.post<Company>(this.url, company);
  }

  update(company: Company): Observable<Company> {
    return this.http.put<Company>(`${this.url}/${company.id}`, company);
  }
}
