import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductResolver } from './product.resolver';

const routes: Routes = [
  {
    path: '',
    component: ProductComponent,
    data: {
      title: 'Cadastro de medicamentos',
    },
  },
  {
    path: 'new',
    component: ProductFormComponent,
    data: {
      title: 'Cadastro de pacientes',
    },
  },
  {
    path: 'edit/:id',
    component: ProductFormComponent,
    resolve: {
      product: ProductResolver,
    },
    data: {
      title: 'Cadastro de pacientes',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class ProductRoutingModule {}
