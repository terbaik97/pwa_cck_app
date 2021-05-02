import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Badge1Page } from './badge1.page';

const routes: Routes = [
  {
    path: '',
    component: Badge1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Badge1PageRoutingModule {}
