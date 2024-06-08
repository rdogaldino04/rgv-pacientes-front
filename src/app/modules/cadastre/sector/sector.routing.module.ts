import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SectorPageResolver } from './sector-page-resolver';
import { SectorComponent } from './sector.component';

const routes: Routes = [
  {
    path: '',
    component: SectorComponent,
    data: {
      title: 'Cadastro de setores',
    },
    resolve: {
      sectorPage: SectorPageResolver,
    },
  },
  // {
  //   path: 'new',
  //   component: BatchFormComponent,
  //   data: {
  //     title: 'Cadastro de lotes',
  //   },
  // },
  // {
  //   path: 'edit/:id',
  //   component: BatchFormComponent,
  //   resolve: {
  //     batch: BatchResolver,
  //   },
  //   data: {
  //     title: 'Cadastro de lotes',
  //   },
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class SectorRoutingModule {}
