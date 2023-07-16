import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MedicamentService } from 'src/app/service/medicament.service';
import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';
import { MedicamentListComponent } from './medicament-list/medicament-list.component';
import { MedicamentComponent } from './medicament.component';
import { MedicamentRoutingModule } from './medicament.routing.module';

@NgModule({
    declarations: [MedicamentComponent, MedicamentListComponent],

    imports: [
        CommonModule,
        AppMaterialModule,
        MedicamentRoutingModule
    ],

    providers: [MedicamentService]

})
export class MedicamentModule { }
