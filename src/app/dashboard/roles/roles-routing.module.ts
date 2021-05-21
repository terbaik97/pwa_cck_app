import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RolesPage } from './roles.page';

const routes: Routes = [
  {
    path: '',
    component: RolesPage
  },
  {
    path: 'edit-modal',
    loadChildren: () => import('./modals/edit-modal/edit-modal.module').then( m => m.EditModalPageModule)
  },
  {
    path: 'report-modal',
    loadChildren: () => import('./modals/report-modal/report-modal.module').then( m => m.ReportModalPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RolesPageRoutingModule {}
