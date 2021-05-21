import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BadgeContributionClaim2Page } from './badge-contribution-claim2.page';

const routes: Routes = [
  {
    path: '',
    component: BadgeContributionClaim2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BadgeContributionClaim2PageRoutingModule {}
