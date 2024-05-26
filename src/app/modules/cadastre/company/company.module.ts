import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CompanyComponent } from './company.component';
import { CompanyRoutingModule } from './company.routing.module';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanyFilterComponent } from './company-filter/company-filter.component';
import { CompanyFormComponent } from './company-form/company-form.component';

@NgModule({
  declarations: [
    CompanyComponent,
    CompanyListComponent,
    CompanyFilterComponent,
    CompanyFormComponent,
  ],

  imports: [
    CommonModule,
    AppMaterialModule,
    ReactiveFormsModule,
    SharedModule,
    FlexLayoutModule,
    CompanyRoutingModule,
  ],
})
export class CompanyModule {}
