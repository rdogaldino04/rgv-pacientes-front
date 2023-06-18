import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
    {
        path: 'pacientes',
        loadChildren: () => import('./patients/patients.module').then(p => p.PatientsModule)
    },
    {
        path: 'medicamentos',
        loadChildren: () => import('./medicament/medicament.module').then(m => m.MedicamentModule)
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ]
})
export class CadastreRoutingModule { }
