import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductModule } from './product/product.module';
import { CadastreRoutingModule } from './cadastre.routing.modeule';
import { BatchModule } from './batch/batch.module';

@NgModule({
  declarations: [],

  imports: [CommonModule, CadastreRoutingModule, ProductModule, BatchModule],
})
export class CadastreModule {}
