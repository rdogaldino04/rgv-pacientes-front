import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SectorPageResolver } from './sector-page-resolver';
import { SectorComponent } from './sector.component';
import { SectorFormComponent } from './sector-form/sector-form.component';
import { SectorResolver } from './sector.resolver';

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
  {
    path: 'new',
    component: SectorFormComponent,
    data: {
      title: 'Cadastro de setores',
    },
  },
  {
    path: 'edit/:id',
    component: SectorFormComponent,
    resolve: {
      sector: SectorResolver,
    },
    data: {
      title: 'Cadastro de setores',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class SectorRoutingModule {}
