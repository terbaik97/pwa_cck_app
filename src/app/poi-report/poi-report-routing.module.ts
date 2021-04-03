import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PoiReportPage } from './poi-report.page';

const routes: Routes = [
  {
    path: '',
    component: PoiReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PoiReportPageRoutingModule {}
