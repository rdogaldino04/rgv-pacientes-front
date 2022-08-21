import { NgModule } from "@angular/core";
import { PatientFormComponent } from './patient-form.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { KzMaskModule } from 'src/app/shared/directives/kz-mask-module';
import { PatientService } from '../patient.service';

@NgModule({
  declarations: [PatientFormComponent],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    KzMaskModule
  ],

  providers: [PatientService]

})
export class PatientFormModule {

}
