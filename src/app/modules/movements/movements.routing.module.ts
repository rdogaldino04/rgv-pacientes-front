import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'inventory',
    loadChildren: () =>
      import('./inventory/inventory.module').then((p) => p.InventoryModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class MovementsRoutingModule {}
