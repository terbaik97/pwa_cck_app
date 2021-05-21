import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BorderDisplayPage } from './border-display.page';

const routes: Routes = [
  {
    path: '',
    component: BorderDisplayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BorderDisplayPageRoutingModule {}
