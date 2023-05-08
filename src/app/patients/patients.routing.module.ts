import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientsComponent } from './patients.component';
import { PatientFormComponent } from './patient-form/patient-form.component';
import { PatientResolver } from './patient.resolver';


const routes: Routes = [
  {
    path: '',
    component: PatientsComponent,
    data: {
      title: 'Pesquisa de pacientes'
    }
  },
  {
    path: 'new',
    component: PatientFormComponent,
    data: {
      title: 'Cadastro de pacientes'
    }
  },
  {
    path: 'edit/:cpf',
    component: PatientFormComponent,
    resolve: {
      patient: PatientResolver
    },
    data: {
      title: 'Editar pacientes'
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

