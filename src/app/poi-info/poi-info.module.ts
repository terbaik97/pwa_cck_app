import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { POIInfoPageRoutingModule } from './poi-info-routing.module';

import { POIInfoPage } from './poi-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    POIInfoPageRoutingModule
  ],
  declarations: [POIInfoPage]
})
export class POIInfoPageModule {}
