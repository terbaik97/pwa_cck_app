import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Badge3Page } from './badge3.page';

const routes: Routes = [
  {
    path: '',
    component: Badge3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Badge3PageRoutingModule {}
