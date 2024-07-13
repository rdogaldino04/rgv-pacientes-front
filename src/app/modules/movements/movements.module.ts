import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InventoryModule } from './inventory/inventory.module';
import { MovementsRoutingModule } from './movements.routing.module';

@NgModule({
  declarations: [],

  imports: [CommonModule, MovementsRoutingModule, InventoryModule],
})
export class MovimentsModule {}
