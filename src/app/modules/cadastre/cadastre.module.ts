import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductModule } from './product/product.module';
import { CadastreRoutingModule } from './cadastre.routing.modeule';

@NgModule({
  declarations: [],

  imports: [CommonModule, CadastreRoutingModule, ProductModule],
})
export class CadastreModule {}
