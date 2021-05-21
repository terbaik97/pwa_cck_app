import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BadgeContributionClaim2PageRoutingModule } from './badge-contribution-claim2-routing.module';

import { BadgeContributionClaim2Page } from './badge-contribution-claim2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BadgeContributionClaim2PageRoutingModule
  ],
  declarations: [BadgeContributionClaim2Page]
})
export class BadgeContributionClaim2PageModule {}
