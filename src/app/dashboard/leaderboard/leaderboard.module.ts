import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LeaderboardPageRoutingModule } from './leaderboard-routing.module';

import { LeaderboardPage } from './leaderboard.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeaderboardPageRoutingModule,
    NgxDatatableModule,
  ],
  declarations: [LeaderboardPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LeaderboardPageModule {}
