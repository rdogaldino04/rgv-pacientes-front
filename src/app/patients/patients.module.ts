import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PatientsComponent } from './patients.component';
import { PatientsRoutingModule } from './patients.routing.module';
import { PatientService } from '../service/patient.service';
import { PatientFormModule } from './patient-form/patient-form.module';
import { PatientResolver } from './patient.resolver';
import { PatientFilterModule } from './patient-filter/patient-filter.module';

@NgModule({
  declarations: [PatientsComponent],

  imports: [
    CommonModule,
    PatientsRoutingModule,
    PatientFormModule,
    PatientFilterModule
  ],

  providers: [PatientService, PatientResolver]

})
export class PatientsModule {

}
