import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';
import { CadastreRoutingModule } from './cadastre.routing.modeule';

@NgModule({
    declarations: [],

    imports: [
        CommonModule,
        CadastreRoutingModule,
        MaterialModule
    ],

})
export class CadastreModule { }
