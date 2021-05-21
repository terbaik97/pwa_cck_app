import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';

import { PoiReportPage } from './poi-report.page';

const routes: Routes = [
  {
    path: '',
    component: PoiReportPage,
    canActivate:[AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PoiReportPageRoutingModule {}
