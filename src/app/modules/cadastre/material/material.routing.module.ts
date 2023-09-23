import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialComponent } from './material.component';
import { MaterialFormComponent } from './material-form/material-form.component';
import { MaterialResolver } from './material.resolver';

const routes: Routes = [
  {
    path: '',
    component: MaterialComponent,
    data: {
      title: 'Cadastro de medicamentos'
    }
  },
  {
    path: 'new',
    component: MaterialFormComponent,
    data: {
      title: 'Cadastro de pacientes'
    }
  },
  {
    path: 'edit/:id',
    component: MaterialFormComponent,
    resolve: {
      material: MaterialResolver
    },
    data: {
      title: 'Cadastro de pacientes'
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class MaterialRoutingModule { }
