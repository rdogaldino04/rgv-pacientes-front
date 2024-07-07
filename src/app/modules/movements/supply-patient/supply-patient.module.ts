import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MovementResolver } from '../movement.resolver';
import { SupplyPatientComponent } from './supply-patient.component';
import { SupplyPatientRoutingModule } from './supply-patient.routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [SupplyPatientComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppMaterialModule,
    SupplyPatientRoutingModule,
    FlexLayoutModule,
    SharedModule,
  ],
  providers: [MovementResolver],
})
export class SupplyPatientModule {}
