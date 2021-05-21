import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BadgeLoginClaim1Page } from './badge-login-claim1.page';

const routes: Routes = [
  {
    path: '',
    component: BadgeLoginClaim1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BadgeLoginClaim1PageRoutingModule {}
