import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientsComponent } from './patients.component';
import { PatientsRoutingModule } from './patients.routing.module';
import { PatientService } from './service/patient.service';
import { PatientFormModule } from './patient-form/patient-form.module';
import { CpfPipeModule } from '../shared/pipe/cpf.pipe.module';
import { KzMaskModule } from '../shared/directives/kz-mask-module';

@NgModule({
  declarations: [PatientsComponent],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PatientsRoutingModule,
    HttpClientModule,
    PatientFormModule,
    CpfPipeModule,
    KzMaskModule
  ],

  providers: [PatientService]

})
export class PatientsModule {

}
