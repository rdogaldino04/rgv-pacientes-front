import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
    {
        path: 'pacientes',
        loadChildren: () => import('./patients/patients.module').then(p => p.PatientsModule)
    },
    {
        path: 'materials',
        loadChildren: () => import('./material/material.module').then(m => m.MaterialModule)
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ]
})
export class CadastreRoutingModule { }
