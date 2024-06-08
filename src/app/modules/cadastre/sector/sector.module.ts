import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';
import { SectorListComponent } from './sector-list/sector-list.component';
import { SectorComponent } from './sector.component';
import { SectorRoutingModule } from './sector.routing.module';
import { SectorFilterComponent } from './sector-filter/sector-filter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SectorFormComponent } from './sector-form/sector-form.component';

@NgModule({
  declarations: [
    SectorComponent,
    SectorListComponent,
    SectorFilterComponent,
    SectorFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    FlexLayoutModule,
    AppMaterialModule,
    SectorRoutingModule,
  ],
})
export class SectorModule {}
