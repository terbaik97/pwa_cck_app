import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Badge2Page } from './badge2.page';

const routes: Routes = [
  {
    path: '',
    component: Badge2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Badge2PageRoutingModule {}
