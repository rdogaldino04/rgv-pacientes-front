import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'pacientes',
    loadChildren: () => import('./modules/cadastre/patients/patients.module').then(p => p.PatientsModule)
  },
  {
    path: 'cadastros',
    loadChildren: () => import('./modules/cadastre/cadastre.module').then(c => c.CadastreModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
