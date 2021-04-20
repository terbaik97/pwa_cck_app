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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
