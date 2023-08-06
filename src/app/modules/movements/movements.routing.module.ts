import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
    {
        path: 'saida-para-pacientes',
        loadChildren: () => import('./supply-patient/supply-patient.module').then(p => p.SupplyPatientModule)
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ]
})
export class MovementsRoutingModule { }
