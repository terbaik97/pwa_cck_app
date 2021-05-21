import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BadgesPage } from './badges.page';

const routes: Routes = [
  {
    path: '',
    component: BadgesPage
  },
  {
    path: 'badge-login-claim1',
    loadChildren: () => import('./badgeClaimModal/badge-login-claim1/badge-login-claim1.module').then( m => m.BadgeLoginClaim1PageModule)
  },
  {
    path: 'badge-login-claim2',
    loadChildren: () => import('./badgeClaimModal/badge-login-claim2/badge-login-claim2.module').then( m => m.BadgeLoginClaim2PageModule)
  },
  {
    path: 'badge-login-claim3',
    loadChildren: () => import('./badgeClaimModal/badge-login-claim3/badge-login-claim3.module').then( m => m.BadgeLoginClaim3PageModule)
  },
  {
    path: 'badge-login-claim4',
    loadChildren: () => import('./badgeClaimModal/badge-login-claim4/badge-login-claim4.module').then( m => m.BadgeLoginClaim4PageModule)
  },
  {
    path: 'badge-contribution-claim1',
    loadChildren: () => import('./badgeClaimModal/badge-contribution-claim1/badge-contribution-claim1.module').then( m => m.BadgeContributionClaim1PageModule)
  },
  {
    path: 'badge-contribution-claim2',
    loadChildren: () => import('./badgeClaimModal/badge-contribution-claim2/badge-contribution-claim2.module').then( m => m.BadgeContributionClaim2PageModule)
  },
  {
    path: 'badge-contribution-claim3',
    loadChildren: () => import('./badgeClaimModal/badge-contribution-claim3/badge-contribution-claim3.module').then( m => m.BadgeContributionClaim3PageModule)
  },
  {
    path: 'badge-contribution-claim4',
    loadChildren: () => import('./badgeClaimModal/badge-contribution-claim4/badge-contribution-claim4.module').then( m => m.BadgeContributionClaim4PageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BadgesPageRoutingModule {}
