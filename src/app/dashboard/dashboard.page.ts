import { Component, OnInit,  } from '@angular/core';
import {Router, RouterEvent} from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Badge1Page } from '../dashboard/badgeDisplayModal/badge1/badge1.page';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(
    private router:Router,
    public modalCtrl: ModalController,
    ) {}

  ngOnInit() {
  }

  toPageBadges(){
    this.router.navigate(['/badges']);
  }

  //modal
  async badgeModal1() {
    const modal = await this.modalCtrl.create({
      component: Badge1Page,
    });

    return await modal.present();
  }
}
