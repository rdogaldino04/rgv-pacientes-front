import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'pacientes',
    loadChildren: () =>
      import('./patients/patients.module').then((p) => p.PatientsModule),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./product/product.module').then((m) => m.ProductModule),
  },
  {
    path: 'batchies',
    loadChildren: () =>
      import('./batch/batch.module').then((m) => m.BatchModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class CadastreRoutingModule {}
