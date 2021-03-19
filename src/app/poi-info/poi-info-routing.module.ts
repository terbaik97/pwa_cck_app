import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { POIInfoPage } from './poi-info.page';

const routes: Routes = [
  {
    path: '',
    component: POIInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class POIInfoPageRoutingModule {}
