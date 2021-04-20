import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'select-campus',
    loadChildren: () => import('./select-campus/select-campus.module').then( m => m.SelectCampusPageModule)
  },
  {
    path: 'poi-info',
    loadChildren: () => import('./poi-info/poi-info.module').then( m => m.POIInfoPageModule)
  },
  {
    path: 'history/:name',
    loadChildren: () => import('./history/history.module').then( m => m.HistoryPageModule)
  },
  {
    path: 'edit',
    loadChildren: () => import('./edit/edit.module').then( m => m.EditPageModule)
  },
  {
    path: 'poi-report/:name',
    loadChildren: () => import('./poi-report/poi-report.module').then( m => m.PoiReportPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardPageModule)
  },
  {
    path: 'chart',
    loadChildren: () => import('./dashboard/chart/chart.module').then(m => m.ChartPageModule)
  },
  {
    path: 'leaderboard',
    loadChildren: () => import('./dashboard/leaderboard/leaderboard.module').then( m => m.LeaderboardPageModule)
  },
  {
    path: 'badges',
    loadChildren: () => import('./dashboard/badges/badges.module').then( m => m.BadgesPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
