import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BadgeLoginClaim2Page } from './badge-login-claim2.page';

const routes: Routes = [
  {
    path: '',
    component: BadgeLoginClaim2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BadgeLoginClaim2PageRoutingModule {}
