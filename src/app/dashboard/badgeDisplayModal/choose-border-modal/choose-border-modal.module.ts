import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChooseBorderModalPageRoutingModule } from './choose-border-modal-routing.module';

import { ChooseBorderModalPage } from './choose-border-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChooseBorderModalPageRoutingModule
  ],
  declarations: [ChooseBorderModalPage]
})
export class ChooseBorderModalPageModule {}
