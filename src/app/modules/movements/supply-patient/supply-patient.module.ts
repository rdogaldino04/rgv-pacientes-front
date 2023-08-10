import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplyPatientRoutingModule } from './supply-patient.routing.module';
import { SupplyPatientComponent } from './supply-patient.component';
import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    SupplyPatientComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppMaterialModule,
    SupplyPatientRoutingModule,
    SharedModule
  ]
})
export class SupplyPatientModule { }
