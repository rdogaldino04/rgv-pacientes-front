import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PatientsComponent } from './patients.component';
import { PatientsRoutingModule } from './patients.routing.module';
import { PatientService } from '../service/patient.service';
import { PatientFormModule } from './patient-form/patient-form.module';
import { PatientResolver } from './patient.resolver';
import { PatientFilterModule } from './patient-filter/patient-filter.module';
import { PatientListModule } from './patient-list/patient-list.module';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [PatientsComponent],

  imports: [
    CommonModule,
    PatientsRoutingModule,
    PatientFormModule,
    PatientFilterModule,
    PatientListModule,
    AppMaterialModule,
    SharedModule
  ],

  providers: [PatientService, PatientResolver]

})
export class PatientsModule {

}
