import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Patient } from './model/patient';
import { PatientService } from './service/patient.service';

@Injectable()
export class PatientResolver implements Resolve<Patient> {

  constructor(private patientService: PatientService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Patient | Observable<Patient> | Promise<Patient> {
    const key = 'cpf';
    const cpf = route.params[key];
    return this.patientService.findByCpf(cpf);
  }

}
