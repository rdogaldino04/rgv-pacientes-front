import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Patient } from '../patients/model/patient';
import { Observable } from 'rxjs';

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

}
