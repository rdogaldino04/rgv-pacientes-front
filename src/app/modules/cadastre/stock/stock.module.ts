import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { StockFilterComponent } from './stock-filter/stock-filter.component';
import { StockListComponent } from './stock-list/stock-list.component';
import { StockComponent } from './stock.component';
import { StockRoutingModule } from './stock.routing.module';
import { StockFormComponent } from './stock-form/stock-form.component';

@NgModule({
  declarations: [
    StockComponent,
    StockListComponent,
    StockFilterComponent,
    StockFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StockRoutingModule,
    AppMaterialModule,
    FlexLayoutModule,
    SharedModule,
  ],
})
export class StockModule {}
