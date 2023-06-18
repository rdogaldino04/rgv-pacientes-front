import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicamentComponent } from './medicament.component';

const routes: Routes = [
    {
      path: '',
      component: MedicamentComponent,
      data: {
        title: 'Cadastro de medicamentos'
      }
    },
    {
      path: 'new',
      component: MedicamentComponent,
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
export class MedicamentRoutingModule { }
