import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';
import { MaterialListComponent } from './material-list/material-list.component';
import { MaterialComponent } from './material.component';
import { MaterialRoutingModule } from './material.routing.module';
import { MaterialService } from 'src/app/service/material.service';

@NgModule({
    declarations: [MaterialComponent, MaterialListComponent],

    imports: [
        CommonModule,
        AppMaterialModule,
        MaterialRoutingModule
    ],

    providers: [MaterialService]

})
export class MaterialModule { }
