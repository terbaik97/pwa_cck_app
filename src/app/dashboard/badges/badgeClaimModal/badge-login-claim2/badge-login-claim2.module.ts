import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BadgeLoginClaim2PageRoutingModule } from './badge-login-claim2-routing.module';

import { BadgeLoginClaim2Page } from './badge-login-claim2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BadgeLoginClaim2PageRoutingModule
  ],
  declarations: [BadgeLoginClaim2Page]
})
export class BadgeLoginClaim2PageModule {}
