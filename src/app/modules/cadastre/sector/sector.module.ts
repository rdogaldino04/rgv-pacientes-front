import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectorComponent } from './sector.component';
import { SectorRoutingModule } from './sector.routing.module';

@NgModule({
  declarations: [SectorComponent],
  imports: [CommonModule, SectorRoutingModule],
})
export class SectorModule {}
