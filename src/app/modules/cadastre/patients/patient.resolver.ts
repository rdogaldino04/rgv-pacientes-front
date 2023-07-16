import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Patient } from 'src/app/model/patient';
import { PatientService } from 'src/app/service/patient.service';

@Injectable()
export class PatientResolver  {

  constructor(private patientService: PatientService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Patient | Observable<Patient> | Promise<Patient> {
    const key = 'cpf';
    const cpf = route.params[key];
    return this.patientService.findByCpf(cpf);
  }

}
