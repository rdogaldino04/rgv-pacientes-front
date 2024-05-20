import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductService } from 'src/app/service/product.service';
import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { BatchFilterComponent } from './batch-filter/batch-filter.component';
import { BatchFormComponent } from './batch-form/batch-form.component';
import { batchListComponent as BatchListComponent } from './batch-list/batch-list.component';
import { BatchComponent as BatchComponent } from './batch.component';
import { BatchRoutingModule } from './batch.routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    BatchComponent,
    BatchListComponent,
    BatchFilterComponent,
    BatchFormComponent,
  ],

  imports: [
    CommonModule,
    AppMaterialModule,
    BatchRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FlexLayoutModule,
  ],

  providers: [ProductService],
})
export class BatchModule {}
