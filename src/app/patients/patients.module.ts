import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientsComponent } from './patients.component';
import { PatientsRoutingModule } from './patients.routing.module';
import { PatientService } from './patient.service';
import { PatientFormModule } from './patient-form/patient-form.module';

@NgModule({
  declarations: [PatientsComponent],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PatientsRoutingModule,
    HttpClientModule,
    PatientFormModule
  ],

  providers: [PatientService]

})
export class PatientsModule {

}
