import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { PatientService } from '../service/patient.service';
import { PatientFormComponent } from './patient-form.component';
import { VMessageModule } from 'src/app/shared/components/vmessage/vmessage.module';
import { KzMaskModule } from '../../shared/directives/kz-mask-module';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({

  declarations: [PatientFormComponent],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    VMessageModule,
    KzMaskModule,
    NgxMaskModule.forChild()
  ],

  providers: [PatientService]

})
export class PatientFormModule { }
