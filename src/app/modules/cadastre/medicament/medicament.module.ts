import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MedicamentComponent } from './medicament.component';
import { MedicamentRoutingModule } from './medicament.routing.module';

@NgModule({
    declarations: [MedicamentComponent],

    imports: [
        CommonModule,
        MedicamentRoutingModule
    ],

})
export class MedicamentModule { }
