import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialComponent } from './material.component';

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
      component: MaterialComponent,
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
