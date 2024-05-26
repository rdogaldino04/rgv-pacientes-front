import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyFormComponent } from './company-form/company-form.component';
import { CompanyPageResolver } from './company-page.resolver';
import { CompanyComponent } from './company.component';
import { CompanyResolver } from './company.resolver';

const routes: Routes = [
  {
    path: '',
    component: CompanyComponent,
    data: {
      title: 'Cadastro de empresas',
    },
    resolve: {
      companyPage: CompanyPageResolver,
    },
  },
  {
    path: 'new',
    component: CompanyFormComponent,
    data: {
      title: 'Cadastro de empresas',
    },
  },
  {
    path: 'edit/:id',
    component: CompanyFormComponent,
    resolve: {
      company: CompanyResolver,
    },
    data: {
      title: 'Editar de empresas',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class CompanyRoutingModule {}
