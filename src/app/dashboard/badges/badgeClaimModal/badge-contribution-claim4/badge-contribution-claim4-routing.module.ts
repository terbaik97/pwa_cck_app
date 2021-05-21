import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BadgeContributionClaim4Page } from './badge-contribution-claim4.page';

const routes: Routes = [
  {
    path: '',
    component: BadgeContributionClaim4Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BadgeContributionClaim4PageRoutingModule {}
