import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Patient } from '../model/patient';
import { Observable, of } from 'rxjs';
import { PatientPage } from '../model/patient-page';
import { PatientFilter } from '../model/patient-filter';
import { filter } from 'rxjs/operators';

const API = environment.ApiUrl;

@Injectable({ providedIn: 'root' })
export class PatientService {

  constructor(private http: HttpClient) { }

  findByCpf(cpf: number): Observable<Patient> {
    return this.http.get<Patient>(`${API}/patients/${cpf}`);
  }

  save(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(`${API}/patients`, patient);
  }

  getAllWithPaginate(filter?: PatientFilter): Observable<PatientPage> {
    let params = new HttpParams();
    if (filter) {
      params = params.set('cpf', filter.cpf ? String(filter.cpf) : '')
      params = params.set('name', filter.name ? filter.name : '');
      params = params.set('size', filter.size ? String(filter.size) : '')
      params = params.set('page', filter.size ? String(filter.page) : '')
    }
    return this.http.get<PatientPage>(`${API}/patients`, { params });
  }

  delete(cpf: number): Observable<void> {
    return this.http.delete<void>(`${API}/patients/${cpf}`);
  }

}
