import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectCampusPageRoutingModule } from './select-campus-routing.module';

import { SelectCampusPage } from './select-campus.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectCampusPageRoutingModule
  ],
  declarations: [SelectCampusPage]
})
export class SelectCampusPageModule {}
