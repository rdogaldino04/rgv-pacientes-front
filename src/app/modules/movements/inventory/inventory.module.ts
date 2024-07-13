import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MovementResolver } from '../movement.resolver';
import { InventoryTransactionComponent } from './inventory.component';
import { InventoryRoutingModule } from './inventory.routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [InventoryTransactionComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppMaterialModule,
    InventoryRoutingModule,
    FlexLayoutModule,
    SharedModule,
  ],
  providers: [MovementResolver],
})
export class InventoryModule {}
