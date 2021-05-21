import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { Badge3PageRoutingModule } from './badge3-routing.module';

import { Badge3Page } from './badge3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Badge3PageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [Badge3Page]
})
export class Badge3PageModule {}
