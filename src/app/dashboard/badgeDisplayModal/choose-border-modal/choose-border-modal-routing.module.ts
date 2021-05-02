import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChooseBorderModalPage } from './choose-border-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ChooseBorderModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChooseBorderModalPageRoutingModule {}
