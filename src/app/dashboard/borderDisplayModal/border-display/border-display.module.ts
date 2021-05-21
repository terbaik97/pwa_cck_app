import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { BorderDisplayPageRoutingModule } from './border-display-routing.module';

import { BorderDisplayPage } from './border-display.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BorderDisplayPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [BorderDisplayPage]
})
export class BorderDisplayPageModule {}
