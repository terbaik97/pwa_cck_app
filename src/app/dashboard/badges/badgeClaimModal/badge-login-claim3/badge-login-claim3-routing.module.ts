import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BadgeLoginClaim3Page } from './badge-login-claim3.page';

const routes: Routes = [
  {
    path: '',
    component: BadgeLoginClaim3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BadgeLoginClaim3PageRoutingModule {}
