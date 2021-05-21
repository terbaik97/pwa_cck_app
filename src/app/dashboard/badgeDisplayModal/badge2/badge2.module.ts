import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { Badge2PageRoutingModule } from './badge2-routing.module';

import { Badge2Page } from './badge2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Badge2PageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [Badge2Page]
})
export class Badge2PageModule {}
