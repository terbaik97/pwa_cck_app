import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BadgeLoginClaim1PageRoutingModule } from './badge-login-claim1-routing.module';

import { BadgeLoginClaim1Page } from './badge-login-claim1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BadgeLoginClaim1PageRoutingModule
  ],
  declarations: [BadgeLoginClaim1Page]
})
export class BadgeLoginClaim1PageModule {}
