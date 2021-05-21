import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BadgeLoginClaim4Page } from './badge-login-claim4.page';

const routes: Routes = [
  {
    path: '',
    component: BadgeLoginClaim4Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BadgeLoginClaim4PageRoutingModule {}
