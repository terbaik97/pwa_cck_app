import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectCampusPage } from './select-campus.page';

const routes: Routes = [
  {
    path: '',
    component: SelectCampusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectCampusPageRoutingModule {}
