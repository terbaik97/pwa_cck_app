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
    path: 'badge2',
    loadChildren: () => import('./badgeDisplayModal/badge2/badge2.module').then( m => m.Badge2PageModule)
  },
  {
    path: 'badge3',
    loadChildren: () => import('./badgeDisplayModal/badge3/badge3.module').then( m => m.Badge3PageModule)
  },
  {
    path: 'border-display',
    loadChildren: () => import('./borderDisplayModal/border-display/border-display.module').then( m => m.BorderDisplayPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
