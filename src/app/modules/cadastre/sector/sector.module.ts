import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';
import { SectorListComponent } from './sector-list/sector-list.component';
import { SectorComponent } from './sector.component';
import { SectorRoutingModule } from './sector.routing.module';

@NgModule({
  declarations: [SectorComponent, SectorListComponent],
  imports: [CommonModule, AppMaterialModule, SectorRoutingModule],
})
export class SectorModule {}
