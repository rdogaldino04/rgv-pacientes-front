import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PatientService } from '../../service/patient.service';
import { PatientFormComponent } from './patient-form.component';
import { VMessageModule } from 'src/app/shared/components/vmessage/vmessage.module';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({

  declarations: [PatientFormComponent],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    VMessageModule,
    NgxMaskModule.forChild()
  ],

  providers: [PatientService]

})
export class PatientFormModule { }
