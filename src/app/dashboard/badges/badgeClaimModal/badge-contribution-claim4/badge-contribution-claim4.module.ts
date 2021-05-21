import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BadgeContributionClaim4PageRoutingModule } from './badge-contribution-claim4-routing.module';

import { BadgeContributionClaim4Page } from './badge-contribution-claim4.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BadgeContributionClaim4PageRoutingModule
  ],
  declarations: [BadgeContributionClaim4Page]
})
export class BadgeContributionClaim4PageModule {}
