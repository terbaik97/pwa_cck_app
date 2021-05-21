import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BadgeLoginClaim3PageRoutingModule } from './badge-login-claim3-routing.module';

import { BadgeLoginClaim3Page } from './badge-login-claim3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BadgeLoginClaim3PageRoutingModule
  ],
  declarations: [BadgeLoginClaim3Page]
})
export class BadgeLoginClaim3PageModule {}
