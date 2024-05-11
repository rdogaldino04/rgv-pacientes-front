import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Company } from '../model/company';

const API = environment.BASE_API;

@Injectable({ providedIn: 'root' })
export class CompanyService {
  constructor(private http: HttpClient) {}

  findByCnpj(cnpj: number): Observable<Company> {
    return this.http.get<Company>(`${API}/companies/cnpj/${cnpj}`);
  }

  findByAll(name: string): Observable<Company[]> {
    return this.http.get<Company[]>(`${API}/companies?name=${name}`);
  }
}
