import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Badge1PageRoutingModule } from './badge1-routing.module';

import { Badge1Page } from './badge1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Badge1PageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [Badge1Page]
})
export class Badge1PageModule {}
