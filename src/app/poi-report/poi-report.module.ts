import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PoiReportPageRoutingModule } from './poi-report-routing.module';

import { PoiReportPage } from './poi-report.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PoiReportPageRoutingModule
  ],
  declarations: [PoiReportPage]
})
export class PoiReportPageModule {}
