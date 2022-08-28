import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Patient } from '../model/patient';

@Injectable({providedIn: 'root'})
export class PatientDataService {

  private patientSubject = new BehaviorSubject<Patient>(null);

  getPatient(): Observable<Patient> {
    return this.patientSubject.asObservable();
  }

  setPatient(patient: Patient): void {
    return this.patientSubject.next(patient);
  }

}
