import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BadgeContributionClaim1PageRoutingModule } from './badge-contribution-claim1-routing.module';

import { BadgeContributionClaim1Page } from './badge-contribution-claim1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BadgeContributionClaim1PageRoutingModule
  ],
  declarations: [BadgeContributionClaim1Page]
})
export class BadgeContributionClaim1PageModule {}
