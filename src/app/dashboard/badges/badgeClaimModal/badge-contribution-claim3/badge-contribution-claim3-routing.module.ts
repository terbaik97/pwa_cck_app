import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BadgeContributionClaim3Page } from './badge-contribution-claim3.page';

const routes: Routes = [
  {
    path: '',
    component: BadgeContributionClaim3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BadgeContributionClaim3PageRoutingModule {}
