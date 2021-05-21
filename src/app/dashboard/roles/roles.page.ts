import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EditModalPage } from '../roles/modals/edit-modal/edit-modal.page';
import { ReportModalPage } from './modals/report-modal/report-modal.page';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.page.html',
  styleUrls: ['./roles.page.scss'],
})
export class RolesPage implements OnInit {

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async editModal() {
    const modal = await this.modalCtrl.create({
      component: EditModalPage,
    });

    return await modal.present();
  }

  async reportModal(){
    const modal = await this.modalCtrl.create({
      component: ReportModalPage,
    });

    return await modal.present();
  }
}
