import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { SearchModalComponent } from '../search-modal/search-modal.component';
import { FilterPipe } from '../pipe/filter.pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [Tab1Page, SearchModalComponent,FilterPipe]
})
export class Tab1PageModule {}
