import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BadgeContributionClaim1Page } from './badgeClaimModal/badge-contribution-claim1/badge-contribution-claim1.page';
import { BadgeContributionClaim2Page } from './badgeClaimModal/badge-contribution-claim2/badge-contribution-claim2.page';
import { BadgeContributionClaim3Page } from './badgeClaimModal/badge-contribution-claim3/badge-contribution-claim3.page';
import { BadgeContributionClaim4Page } from './badgeClaimModal/badge-contribution-claim4/badge-contribution-claim4.page';
import { BadgeLoginClaim1Page } from './badgeClaimModal/badge-login-claim1/badge-login-claim1.page';
import { BadgeLoginClaim2Page } from './badgeClaimModal/badge-login-claim2/badge-login-claim2.page';
import { BadgeLoginClaim3Page } from './badgeClaimModal/badge-login-claim3/badge-login-claim3.page';
import { BadgeLoginClaim4Page } from './badgeClaimModal/badge-login-claim4/badge-login-claim4.page';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-badges',
  templateUrl: './badges.page.html',
  styleUrls: ['./badges.page.scss'],
})
export class BadgesPage implements OnInit {
  listClaimedBadges:any;
  buttonClaimedLogin1:any;
  buttonClaimedLogin2:any;
  buttonClaimedLogin3:any;
  buttonClaimedLogin4:any;
  buttonClaimedCont1:any;
  buttonClaimedCont2:any;
  buttonClaimedCont3:any;
  buttonClaimedCont4:any;

  constructor(public modalCtrl: ModalController,
    private firebaseService: FirebaseService,) {
    this.firebaseService.read_claimed_badge().subscribe(data => {
      this.listClaimedBadges = data.map(e => {
        return {
          id: e.payload.doc.id,
          claimedContBadge1: e.payload.doc.data()['claimedContBadge1'],
          claimedContBadge2: e.payload.doc.data()['claimedContBadge2'],
          claimedContBadge3: e.payload.doc.data()['claimedContBadge3'],
          claimedContBadge4: e.payload.doc.data()['claimedContBadge4'],
          claimedLoginBadge1: e.payload.doc.data()['claimedLoginBadge1'],
          claimedLoginBadge2: e.payload.doc.data()['claimedLoginBadge2'],
          claimedLoginBadge3: e.payload.doc.data()['claimedLoginBadge3'],
          claimedLoginBadge4: e.payload.doc.data()['claimedLoginBadge4'],
        };
      })
      // console.log(this.listClaimedBadges);
      //assign value to badges variable
      this.buttonClaimedLogin1=this.listClaimedBadges[0].claimedLoginBadge1;
      this.buttonClaimedLogin2=this.listClaimedBadges[0].claimedLoginBadge2;
      this.buttonClaimedLogin3=this.listClaimedBadges[0].claimedLoginBadge3;
      this.buttonClaimedLogin4=this.listClaimedBadges[0].claimedLoginBadge4;
      this.buttonClaimedCont1=this.listClaimedBadges[0].claimedContBadge1;
      this.buttonClaimedCont2=this.listClaimedBadges[0].claimedContBadge2;
      this.buttonClaimedCont3=this.listClaimedBadges[0].claimedContBadge3;
      this.buttonClaimedCont4=this.listClaimedBadges[0].claimedContBadge4;
    });
  }

  ngOnInit() {
  }

  async toClaimLoginModal1(){
    const modal = await this.modalCtrl.create({
      component: BadgeLoginClaim1Page,
    });

    return await modal.present();
  }

  async toClaimLoginModal2(){
    const modal = await this.modalCtrl.create({
      component: BadgeLoginClaim2Page,
    });

    return await modal.present();
  }

  async toClaimLoginModal3(){
    const modal = await this.modalCtrl.create({
      component: BadgeLoginClaim3Page,
    });

    return await modal.present();
  }

  async toClaimLoginModal4(){
    const modal = await this.modalCtrl.create({
      component: BadgeLoginClaim4Page,
    });

    return await modal.present();
  }

  async toClaimContModal1(){
    const modal = await this.modalCtrl.create({
      component: BadgeContributionClaim1Page,
    });

    return await modal.present();
  }

  async toClaimContModal2(){
    const modal = await this.modalCtrl.create({
      component: BadgeContributionClaim2Page,
    });

    return await modal.present();
  }

  async toClaimContModal3(){
    const modal = await this.modalCtrl.create({
      component: BadgeContributionClaim3Page,
    });

    return await modal.present();
  }

  async toClaimContModal4(){
    const modal = await this.modalCtrl.create({
      component: BadgeContributionClaim4Page,
    });

    return await modal.present();
  }
}
