import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductService } from 'src/app/service/product.service';
import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product.component';
import { ProductRoutingModule } from './product.routing.module';

@NgModule({
  declarations: [
    ProductComponent,
    ProductListComponent,
    ProductFilterComponent,
    ProductFormComponent,
  ],

  imports: [
    CommonModule,
    AppMaterialModule,
    ProductRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],

  providers: [ProductService],
})
export class ProductModule {}
