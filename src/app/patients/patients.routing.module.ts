import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientsComponent } from './patients.component';
import { PatientFormComponent } from './patient-form/patient-form.component';
import { PatientResolver } from './patient.resolver';


const routes: Routes = [
  {
    path: '',
    component: PatientsComponent
  },
  {
    path: 'novo',
    component: PatientFormComponent
  },
  {
    path: ':cpf/editar',
    component: PatientFormComponent,
    resolve: {
      patient: PatientResolver
    }
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PatientsRoutingModule { }

