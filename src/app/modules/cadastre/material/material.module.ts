import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';
import { MaterialListComponent } from './material-list/material-list.component';
import { MaterialComponent } from './material.component';
import { MaterialRoutingModule } from './material.routing.module';
import { MaterialService } from 'src/app/service/material.service';
import { MaterialFilterComponent } from './material-filter/material-filter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialFormComponent } from './material-form/material-form.component';

@NgModule({
    declarations: [
        MaterialComponent, 
        MaterialListComponent, 
        MaterialFilterComponent,
        MaterialFormComponent
    ],

    imports: [
        CommonModule,
        AppMaterialModule,
        MaterialRoutingModule,
        ReactiveFormsModule,
        SharedModule
    ],

    providers: [MaterialService]

})
export class MaterialModule { }
