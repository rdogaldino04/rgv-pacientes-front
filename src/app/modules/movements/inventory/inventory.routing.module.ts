import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventoryTransactionComponent } from './inventory.component';
import { MovementResolver } from '../movement.resolver';

const routes: Routes = [
  {
    path: '',
    component: InventoryTransactionComponent,
    data: {
      title: 'Nova movimentação',
    },
  },

  {
    path: ':id',
    component: InventoryTransactionComponent,
    data: {
      title: 'Atualizar movimentação',
    },
    resolve: {
      movement: MovementResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventoryRoutingModule {}
