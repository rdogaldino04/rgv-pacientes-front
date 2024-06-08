import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectorComponent } from './sector.component';
import { SectorRoutingModule } from './sector.routing.module';
import { SectorListComponent } from './sector-list/sector-list.component';

@NgModule({
  declarations: [SectorComponent, SectorListComponent],
  imports: [CommonModule, SectorRoutingModule],
})
export class SectorModule {}
