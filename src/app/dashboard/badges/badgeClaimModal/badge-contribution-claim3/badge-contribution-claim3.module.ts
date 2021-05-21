import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BadgeContributionClaim3PageRoutingModule } from './badge-contribution-claim3-routing.module';

import { BadgeContributionClaim3Page } from './badge-contribution-claim3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BadgeContributionClaim3PageRoutingModule
  ],
  declarations: [BadgeContributionClaim3Page]
})
export class BadgeContributionClaim3PageModule {}
