import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Patient } from '../model/patient';
import { Observable } from 'rxjs';
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
    const params = filter
      ? new HttpParams()
        .set('cpf', String(filter.cpf))
        .set('name', filter.name)
      : new HttpParams();
    return this.http.get<PatientPage>(`${API}/patients`, { params });
  }

}
