import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MedicamentModule } from './medicament/medicament.module';
import { CadastreRoutingModule } from './cadastre.routing.modeule';

@NgModule({
    declarations: [],

    imports: [
        CommonModule,
        CadastreRoutingModule,
        MedicamentModule
    ],

})
export class CadastreModule { }
