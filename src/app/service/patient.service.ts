import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Patient } from '../model/patient';
import { Observable } from 'rxjs';
import { PatientPage } from '../model/patient-page';
import { PatientFilter } from '../model/patient-filter';
import { first } from 'rxjs/operators';

const API = environment.ApiUrl;

@Injectable({ providedIn: 'root' })
export class PatientService {

  constructor(private http: HttpClient) { }

  findByCpf(cpf: number): Observable<Patient> {
    return this.http.get<Patient>(`${API}/patients/${cpf}`);
  }

  save(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(`${API}/patients`, patient).pipe(first());
  }

  getAllWithPaginate(patientFilter?: PatientFilter): Observable<PatientPage> {
    let params = new HttpParams();
    if (patientFilter) {
      params = params.set('cpf', patientFilter.cpf ? String(patientFilter.cpf) : '');
      params = params.set('name', patientFilter.name ? patientFilter.name : '');
      params = params.set('size', patientFilter.size ? String(patientFilter.size) : '');
      params = params.set('page', patientFilter.size ? String(patientFilter.page) : '');
    }
    return this.http.get<PatientPage>(`${API}/patients`, { params });
  }

  delete(cpf: number): Observable<void> {
    return this.http.delete<void>(`${API}/patients/${cpf}`).pipe(first());
  }

  update(patient: Patient): Observable<Patient> {
    return this.http.put<Patient>(`${API}/patients/${patient.id}`, patient).pipe(first());
  }

}
