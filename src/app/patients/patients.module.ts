import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientsComponent } from './patients.component';
import { PatientsRoutingModule } from './patients.routing.module';
import { PatientService } from '../service/patient.service';
import { PatientFormModule } from './patient-form/patient-form.module';
import { CpfPipeModule } from '../shared/pipe/cpf.pipe.module';
import { PatientResolver } from './patient.resolver';
import { NgxMaskModule } from 'ngx-mask';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
  declarations: [PatientsComponent],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PatientsRoutingModule,
    PatientFormModule,
    CpfPipeModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    NgxMaskModule.forChild()
  ],

  providers: [PatientService, PatientResolver]

})
export class PatientsModule {

}
