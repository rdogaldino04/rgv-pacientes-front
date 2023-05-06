import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PatientService } from '../../service/patient.service';
import { PatientFormComponent } from './patient-form.component';
import { VMessageModule } from 'src/app/shared/components/vmessage/vmessage.module';
import { NgxMaskModule } from 'ngx-mask';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({

  declarations: [PatientFormComponent],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    VMessageModule,
    NgxMaskModule.forChild(),
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule
  ],

  providers: [PatientService]

})
export class PatientFormModule { }
