import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BatchComponent } from './batch.component';
import { BatchFormComponent } from './batch-form/batch-form.component';
import { BatchResolver } from './batch.resolver';
import { BatchPageResolver } from './batch-page-resolver';

const routes: Routes = [
  {
    path: '',
    component: BatchComponent,
    data: {
      title: 'Cadastro de lotes',
    },
    resolve: {
      batchPage: BatchPageResolver,
    },
  },
  {
    path: 'new',
    component: BatchFormComponent,
    data: {
      title: 'Cadastro de lotes',
    },
  },
  {
    path: 'edit/:id',
    component: BatchFormComponent,
    resolve: {
      batch: BatchResolver,
    },
    data: {
      title: 'Cadastro de lotes',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class BatchRoutingModule {}
