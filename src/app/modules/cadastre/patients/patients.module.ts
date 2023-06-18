import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PatientService } from 'src/app/service/patient.service';
import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PatientFilterModule } from './patient-filter/patient-filter.module';
import { PatientFormModule } from './patient-form/patient-form.module';
import { PatientListModule } from './patient-list/patient-list.module';
import { PatientResolver } from './patient.resolver';
import { PatientsComponent } from './patients.component';
import { PatientsRoutingModule } from './patients.routing.module';

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
