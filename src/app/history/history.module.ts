import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoryPageRoutingModule } from './history-routing.module';

import { HistoryPage } from './history.page';

import { NgCircleProgressModule } from 'ng-circle-progress';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoryPageRoutingModule,
    NgCircleProgressModule.forRoot({
      "clockwise": false,
      "unitsFontSize":"40",
      "titleFontSize": "57",
      "subtitleFontSize": "25",
      "titleColor":"#3880FF",
      "unitsColor":"#3880FF",
      "outerStrokeLinecap":"round",
    })
  ],
  declarations: [HistoryPage]
})
export class HistoryPageModule {}
