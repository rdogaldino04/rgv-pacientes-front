import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'cadastros',
    loadChildren: () =>
      import('./modules/cadastre/cadastre.module').then(
        (c) => c.CadastreModule
      ),
  },
  {
    path: 'movimentacoes',
    loadChildren: () =>
      import('./modules/movements/movements.module').then(
        (c) => c.MovimentsModule
      ),
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
