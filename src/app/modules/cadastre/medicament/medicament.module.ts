import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';
import { MedicamentListComponent } from './medicament-list/medicament-list.component';
import { MedicamentComponent } from './medicament.component';
import { MedicamentRoutingModule } from './medicament.routing.module';
import { MaterialService } from 'src/app/service/material.service';

@NgModule({
    declarations: [MedicamentComponent, MedicamentListComponent],

    imports: [
        CommonModule,
        AppMaterialModule,
        MedicamentRoutingModule
    ],

    providers: [MaterialService]

})
export class MedicamentModule { }
