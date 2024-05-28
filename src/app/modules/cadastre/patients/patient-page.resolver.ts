import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PatientPage } from 'src/app/model/patient-page';
import { PatientService } from 'src/app/service/patient.service';

@Injectable({
  providedIn: 'root'
})
export class PatientPageResolver  {

  constructor(private patientService: PatientService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): PatientPage | Observable<PatientPage> | Promise<PatientPage> {
    return this.patientService.getAllWithPaginate();
  }

}
