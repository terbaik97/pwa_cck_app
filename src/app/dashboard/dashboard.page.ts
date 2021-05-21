import { Component, OnInit,  } from '@angular/core';
import {Router, RouterEvent} from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Badge1Page } from '../dashboard/badgeDisplayModal/badge1/badge1.page';
import { Badge2Page } from '../dashboard/badgeDisplayModal/badge2/badge2.page';
import { Badge3Page } from '../dashboard/badgeDisplayModal/badge3/badge3.page';
import { FirebaseService } from '../services/firebase.service';
import { BorderDisplayPage } from './borderDisplayModal/border-display/border-display.page';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  badgeList = [];
  currentbadge1={};
  currentbadge2: any;
  currentbadge3: any;
  currentborder:any;
  constructor(
    private router:Router,
    public modalCtrl: ModalController,
    private firebaseService: FirebaseService
    ){
      this.firebaseService.read_current_badge().subscribe(data => {
        this.badgeList = data.map(e => {
          return {
            id: e.payload.doc.id,
            borderChosen1: e.payload.doc.data()['borderChosen1'],
            borderChosen2: e.payload.doc.data()['borderChosen2'],
            borderChosen3: e.payload.doc.data()['borderChosen3'],
            borderDisplayChosen: e.payload.doc.data()['borderDisplayChosen'],
          };
        })
        // console.log(this.badgeList);
        //assign value to badges variable
        this.currentbadge1=this.badgeList[0].borderChosen1;
        this.currentbadge2=this.badgeList[0].borderChosen2;
        this.currentbadge3=this.badgeList[0].borderChosen3;
        this.currentborder=this.badgeList[0].borderDisplayChosen;
      });
    }

  ngOnInit() {
  }

  toPageBadges(){
    this.router.navigate(['/badges']);
  }

  //first Badge Modal
  async badgeModal1() {
    const modal = await this.modalCtrl.create({
      component: Badge1Page,
    });

    return await modal.present();
  }

  //modal
  async badgeModal2() {
    const modal = await this.modalCtrl.create({
      component: Badge2Page,
    });

    return await modal.present();
  }

  //modal
  async badgeModal3() {
    const modal = await this.modalCtrl.create({
      component: Badge3Page,
    });

    return await modal.present();
  }

  async toBorderModal(){
    const modal = await this.modalCtrl.create({
      component: BorderDisplayPage,
    });

    return await modal.present();
  }
}
