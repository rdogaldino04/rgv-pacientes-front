import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientService } from 'src/app/service/patient.service';
import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';
import { VMessageModule } from 'src/app/shared/components/vmessage/vmessage.module';
import { PatientFormComponent } from './patient-form.component';

@NgModule({

  declarations: [PatientFormComponent],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    VMessageModule,
    AppMaterialModule
  ],

  providers: [PatientService]

})
export class PatientFormModule { }
