import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupplyPatientComponent } from './supply-patient.component';

const routes: Routes = [
  {
    path: '',
    component: SupplyPatientComponent,
    data: {
      title: 'Saída para paciente'
    }
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SupplyPatientRoutingModule { }
