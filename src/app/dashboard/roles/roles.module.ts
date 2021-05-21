import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RolesPageRoutingModule } from './roles-routing.module';

import { RolesPage } from './roles.page';
import { EditModalPage } from '../roles/modals/edit-modal/edit-modal.page';
import { ReportModalPage } from '../roles/modals/report-modal/report-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RolesPageRoutingModule
  ],
  declarations: [RolesPage, EditModalPage, ReportModalPage]
})
export class RolesPageModule {}
