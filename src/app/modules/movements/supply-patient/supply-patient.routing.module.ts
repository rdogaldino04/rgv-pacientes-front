import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupplyPatientComponent } from './supply-patient.component';
import { MovementResolver } from '../movement.resolver';

const routes: Routes = [
  {
    path: '',
    component: SupplyPatientComponent,
    data: {
      title: 'Saída para paciente'
    }
  },

  {
    path: ':id',
    component: SupplyPatientComponent,
    data: {
      title: 'Saída para paciente'
    },
    resolve: {
      movement: MovementResolver
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
