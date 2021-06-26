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
import { ProfileService } from 'src/app/services/profile.service';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-badges',
  templateUrl: './badges.page.html',
  styleUrls: ['./badges.page.scss'],
})
export class BadgesPage implements OnInit {
  //disable claim
  disableBadges =[];
  //
  listClaimedBadges:any;
  buttonClaimedLogin1:any;
  buttonClaimedLogin2:any;
  buttonClaimedLogin3:any;
  buttonClaimedLogin4:any;
  buttonClaimedCont1:any;
  buttonClaimedCont2:any;
  buttonClaimedCont3:any;
  buttonClaimedCont4:any;
  countBadges = 0;
  recordBorder = {}
  usableclaimedLogBadge2:any = false;
  usableclaimedLogBadge3:any = false;
  usableclaimedLogBadge4:any = false;
  usableclaimedContBadge2:any = false;
  usableclaimedContBadge3:any = false;
  usableclaimedContBadge4:any = false;
  checkClaimBadges:any;
  array = [];
  constructor(public modalCtrl: ModalController,
    private firebaseService: FirebaseService,
    private _profileService:ProfileService,
    private _authService:AuthService,
    private firestore: AngularFirestore,
    private router: Router,
    ) 
    {
    

    this.firestore
    .collection("claim-badges").doc(this._authService.getUserId())
    .get()
    .subscribe((data: any) => {
      this.checkClaimBadges = data.data()
      console.log(this.checkClaimBadges)
      this.checkUserUpdate(this.checkClaimBadges);
      this.checkUserCreate(this.checkClaimBadges);
    });
  }

  ngOnInit() {
    // this.checkUserUpdate()
    // this.checkUserCreate()
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

  updateBadges(user_id,badges,condition){
    this.recordBorder['badges'] = condition;
    this.firebaseService.update_claimed_badge(user_id, badges);
  }

  // updateUser(user_id,badges,condition){
  //   this.recordBorder['badges'] = condition;
  //   this.firestore.doc(this.collectionProfile + '/' + recordID).update(record);
  // }

  checkUserUpdate(checkClaimBadges:any){
  
    this._profileService.getUseractivityUpdate().subscribe((res: any)=>
    {
      console.log(checkClaimBadges);
      this.firebaseService.update_user_actions(this._authService.getUserId(),res);
      console.log(res.data);
      this.array =res.data;
      console.log(this.array)
      if(res.data.length >= 1)
      {
        this.usableclaimedContBadge2= true;
        this.usableclaimedContBadge3= true;
        this.usableclaimedContBadge4= true;
        if(checkClaimBadges.claimedContBadge1 == true){
          this.buttonClaimedCont1=true;
        }
        else{
        this.buttonClaimedCont1=false;
        this.recordBorder['claimedContBadge1'] = false;
        this.countBadges+=1;
        this.recordBorder['totalBadges'] = this.countBadges;
        this.firebaseService.update_claimed_badge(this._authService.getUserId(), this.recordBorder);
        // this.usableclaimedContBadge1= true;
        }
      }
       if(res.data.length >= 7 )
      {
        this.usableclaimedContBadge3= true;
        this.usableclaimedContBadge4= true;
        if(checkClaimBadges.claimedContBadge2 == true){
          this.buttonClaimedCont2=true;
        }
        else{
        this.buttonClaimedCont2=false;
        this.recordBorder['claimedContBadge2'] = false;
        // this.usableclaimedContBadge2=this.checkClaimBadges.claimedContBadge2 ? this.checkClaimBadges.claimedContBadge2 : false
        this.countBadges+=2;
        this.recordBorder['totalBadges'] = this.countBadges;
        this.firebaseService.update_claimed_badge(this._authService.getUserId(), this.recordBorder);
        // this.buttonClaimedCont2= true;
        }
      }
        if(res.data.length >= 10 )
      {
      
        this.usableclaimedContBadge4= true;
        if(checkClaimBadges.claimedContBadge3 == true){
          this.buttonClaimedCont3=true;
        }
        else{
        this.buttonClaimedCont3=false;
        this.recordBorder['claimedContBadge3'] = false;
        // this.usableclaimedContBadge3=this.checkClaimBadges.claimedContBadge3 ? this.checkClaimBadges.claimedContBadge3 : false
        this.countBadges+=3;
        this.recordBorder['totalBadges'] = this.countBadges;
        this.firebaseService.update_claimed_badge(this._authService.getUserId(), this.recordBorder);
        // this.usableclaimedContBadge3= true;
        }
      }
       if(res.data.length >= 100)
      {
       
        if(checkClaimBadges.claimedContBadge4 == true){
          this.buttonClaimedCont4=true;
        }
        else{
        this.buttonClaimedCont4=false;
        this.recordBorder['claimedContBadge4'] = false;
        this.usableclaimedContBadge4=this.checkClaimBadges.claimedContBadge4 ? this.checkClaimBadges.claimedContBadge4 : false
        this.countBadges+=4;
        this.recordBorder['totalBadges'] = this.countBadges;
        this.firebaseService.update_claimed_badge(this._authService.getUserId(), this.recordBorder);
        // this.usableclaimedContBadge4= true;
        }
      }
      
    });
  }

  checkUserCreate(checkClaimBadges){
   console.log(checkClaimBadges);
    this._profileService.getUseractivityCreate().subscribe((res:any)=>
    {
      console.log(res.data);
      this.firebaseService.create_user_actions(this._authService.getUserId(),res);
     console.log(res.data.length);
      if(res.data.length >= 1 ){
        console.log(checkClaimBadges);
        this.usableclaimedLogBadge2 = true;
        this.usableclaimedLogBadge3 = true;
        this.usableclaimedLogBadge4 = true;
        if(checkClaimBadges.claimedLoginBadge1 == true){
          this.buttonClaimedLogin1=true;
        }
        else{
        this.recordBorder['claimedLoginBadge1'] = false;
        this.buttonClaimedLogin1=false;
        this.countBadges+=1;
        this.recordBorder['totalBadges'] = this.countBadges;
        this.firebaseService.update_claimed_badge(this._authService.getUserId(), this.recordBorder);
        }
      }
        if(res.data.length >= 7 ){
        this.usableclaimedLogBadge3 = true;
        this.usableclaimedLogBadge4 = true;
        if(checkClaimBadges.claimedLoginBadge2 == true){
          this.buttonClaimedLogin2=true;
        }
        else{
        this.recordBorder['claimedLoginBadge2'] = false;
        this.buttonClaimedLogin2=false;
        this.countBadges+=2;
        this.recordBorder['totalBadges'] = this.countBadges;
        this.firebaseService.update_claimed_badge(this._authService.getUserId(), this.recordBorder);
        }
      }
        if(res.data.length >= 30 ){
        this.usableclaimedLogBadge4 = true;
        if(checkClaimBadges.claimedLoginBadge3 == true){
          this.buttonClaimedLogin3=true;
        }
        else{
        this.recordBorder['claimedLoginBadge3'] = false;
        this.buttonClaimedLogin3=false;
        this.countBadges+=3;
        this.recordBorder['totalBadges'] = this.countBadges;
        this.firebaseService.update_claimed_badge(this._authService.getUserId(), this.recordBorder);
        }
      }
        if(res.data.length >= 90){
       
        if(checkClaimBadges.claimedLoginBadge4 == true){
          this.buttonClaimedLogin4=true;
        }
        else{
        this.recordBorder['claimedLoginBadge4'] = false;
        this.buttonClaimedLogin4=false;
        this.countBadges+=4;
        this.recordBorder['totalBadges'] = this.countBadges;
        this.firebaseService.update_claimed_badge(this._authService.getUserId(), this.recordBorder);
        }
      }
    });

  }

}
