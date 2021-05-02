import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage
  },
  {
    path: 'chart',
    loadChildren: () => import('./chart/chart.module').then( m => m.ChartPageModule)
  },
  {
    path: 'roles',
    loadChildren: () => import('./roles/roles.module').then( m => m.RolesPageModule)
  },
  {
    path: 'badge1',
    loadChildren: () => import('./badgeDisplayModal/badge1/badge1.module').then( m => m.Badge1PageModule)
  },
  {
    path: 'choose-border-modal',
    loadChildren: () => import('./badgeDisplayModal/choose-border-modal/choose-border-modal.module').then( m => m.ChooseBorderModalPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
