import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectPagePageRoutingModule } from './select-page-routing.module';

import { SelectPagePage } from './select-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectPagePageRoutingModule
  ],
  declarations: [SelectPagePage]
})
export class SelectPagePageModule {}
