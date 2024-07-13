import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/auth/permissions-service';

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
    canActivate: [AuthGuard],
  },
  {
    path: 'cadastros',
    loadChildren: () =>
      import('./modules/cadastre/cadastre.module').then(
        (c) => c.CadastreModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'movement',
    loadChildren: () =>
      import('./modules/movements/movements.module').then(
        (c) => c.MovimentsModule
      ),
    canActivate: [AuthGuard],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
