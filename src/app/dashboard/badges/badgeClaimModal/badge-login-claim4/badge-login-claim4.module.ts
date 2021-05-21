import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BadgeLoginClaim4PageRoutingModule } from './badge-login-claim4-routing.module';

import { BadgeLoginClaim4Page } from './badge-login-claim4.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BadgeLoginClaim4PageRoutingModule
  ],
  declarations: [BadgeLoginClaim4Page]
})
export class BadgeLoginClaim4PageModule {}
