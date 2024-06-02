import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockPageResolver } from './stock-page-resolver';
import { StockComponent } from './stock.component';
import { StockResolver } from './stock.resolver';
import { StockFormComponent } from './stock-form/stock-form.component';

const routes: Routes = [
  {
    path: '',
    component: StockComponent,
    data: {
      title: 'Cadastro de estoques',
    },
    resolve: {
      stockPage: StockPageResolver,
    },
  },
  {
    path: 'new',
    component: StockFormComponent,
    data: {
      title: 'Criar estoque',
    },
  },
  {
    path: 'edit/:id',
    component: StockFormComponent,
    resolve: {
      stock: StockResolver,
    },
    data: {
      title: 'Editar estoque',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class StockRoutingModule {}
