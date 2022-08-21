import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { PatientService } from '../patient.service';
import { PatientFormComponent } from './patient-form.component';
import { VMessageModule } from "src/app/shared/components/vmessage/vmessage.module";
import { KzMaskModule } from '../../shared/directives/kz-mask-module';

@NgModule({

  declarations: [PatientFormComponent],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    VMessageModule,
    KzMaskModule
  ],

  providers: [PatientService]

})
export class PatientFormModule { }
