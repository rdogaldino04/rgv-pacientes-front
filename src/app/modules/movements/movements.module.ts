import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SupplyPatientModule } from './supply-patient/supply-patient.module';
import { MovementsRoutingModule } from './movements.routing.module';

@NgModule({
    declarations: [],

    imports: [
        CommonModule,
        MovementsRoutingModule,        
        SupplyPatientModule
    ],

})
export class MovimentsModule { }
