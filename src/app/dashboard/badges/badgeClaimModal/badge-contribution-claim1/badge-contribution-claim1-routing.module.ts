import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BadgeContributionClaim1Page } from './badge-contribution-claim1.page';

const routes: Routes = [
  {
    path: '',
    component: BadgeContributionClaim1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BadgeContributionClaim1PageRoutingModule {}
