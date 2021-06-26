import { Component, OnInit,  } from '@angular/core';
import {Router, RouterEvent} from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Badge1Page } from '../dashboard/badgeDisplayModal/badge1/badge1.page';
import { Badge2Page } from '../dashboard/badgeDisplayModal/badge2/badge2.page';
import { Badge3Page } from '../dashboard/badgeDisplayModal/badge3/badge3.page';
import { FirebaseService } from '../services/firebase.service';
import { BorderDisplayPage } from './borderDisplayModal/border-display/border-display.page';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
   //Badges progres
   badgeType = 'create';
   userActionLists =[];
   userTotalCreate = 0;
   userTotalUpdate = 0;
   percentBadge1 = 0;
   percentBadge2 = 0;
   percentBadge3 = 0;
   percentBadge4 = 0;
   percentBadge5 = 0;
   percentBadge6 = 0;
   percentBadge7 = 0;
   percentBadge8 = 0;
   //created user
   createdUser = false;
   //roles progress 
   userInfo: any;
   userPoints: any;
   //progress graph
   percentEdit=100;
   percentReport: number;
   //badge
   badgeList = [];
   currentbadge1: any;
   currentbadge2: any;
   currentbadge3: any;
   currentborder: any;
  totalBadges:any;
  totalPoint:any;
  array=[]
  constructor(
    private router:Router,
    public modalCtrl: ModalController,
    private firebaseService: FirebaseService,
    private firestore: AngularFirestore,
    private _authService:AuthService,
    ){
      //read current badges and border
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
        for(let i = 0; i < this.badgeList.length; i++){
          if(this.badgeList[i].id === this._authService.getUserId()){
            this.currentbadge1=this.badgeList[i].borderChosen1;
            this.currentbadge2=this.badgeList[i].borderChosen2;
            this.currentbadge3=this.badgeList[i].borderChosen3;
            this.currentborder=this.badgeList[i].borderDisplayChosen;
          }
        }
        //create new id for current badges and border
        let id = obj => obj.id === this._authService.getUserId();
        // console.log(this.badgeList.some(id));
        if(!(this.badgeList.some(id))){
          this.firebaseService.create_current_badge();
        }
      });

      //roles progress report
      this.firebaseService.read_user().subscribe(data => {
        this.userInfo = data.map(e => {
          return {
            id: e.payload.doc.id,
            totalPoints: e.payload.doc.data()['totalPoints'],
          };
        })
        for(let i = 0; i < this.userInfo.length; i++){
          if(this.userInfo[i].id === this._authService.getUserId()){
            this.userPoints=this.userInfo[i].totalPoints;
          }
        }
        this.percentReport = this.userPoints/200*100;
        if(this.percentReport >= 100){
          this.percentReport = 100;
        }
        // console.log(this.percentReport);
      });

      //Badges Create progress report
      this.firestore
      .collection("user_actions").doc(this._authService.getUserId()).collection('create')
      .get()
      .subscribe((ss) => {
        ss.docs.forEach((doc) => {
         this.userActionLists.push(doc.data());
        });
        // console.log(this.userActionLists);
        for(let i = 0; i < this.userActionLists.length; i++){
          this.userTotalCreate+=1;
          if(Object.keys(this.userActionLists[i]).length === 0){
            this.userTotalCreate-=1;
          }
          // console.log(Object.keys(this.userActionLists[i]).length);
        }
        // console.log(this.userTotalCreate);
        //convert value to percentage

        if(this.userTotalCreate > 1 || this.userTotalCreate <= 90){
          this.percentBadge4 = this.userTotalCreate/90*100;
          if(this.percentBadge4 >= 100){
            this.percentBadge4 = 100;
          }
        }

         if(this.userTotalCreate > 1 || this.userTotalCreate <= 30){
          this.percentBadge3 = this.userTotalCreate/30*100;
          if(this.percentBadge3 >= 100){
            this.percentBadge3 = 100;
          }
        }

         if(this.userTotalCreate > 1 || this.userTotalCreate <= 7){
          this.percentBadge2 = this.userTotalCreate/7*100;
          if(this.percentBadge2 >= 100){
            this.percentBadge2 = 100;
          }
        }

         if(this.userTotalCreate >= 1){
          this.percentBadge1 = this.userTotalCreate/1*100;
          if(this.percentBadge1 >= 100){
            this.percentBadge1 = 100;
          }
        }
        // console.log(this.percentBadge1);
      });

      //Badges Update progress report
      this.firestore
      .collection("user_actions").doc(this._authService.getUserId()).collection('update')
      .get()
      .subscribe((ss) => {
        ss.docs.forEach((doc) => {
        this.userActionLists.push(doc.data());
        });
        // console.log(this.userActionLists);
        for(let i = 0; i < this.userActionLists.length; i++){
          this.userTotalUpdate+=1;
          if(Object.keys(this.userActionLists[i]).length === 0){
            this.userTotalUpdate-=1;
          }
          // console.log(Object.keys(this.userActionLists[i]).length);
        }
        // console.log(this.userTotalUpdate);
        //convert value to percentage

        if(this.userTotalUpdate > 1 || this.userTotalUpdate <= 90){
          this.percentBadge8 = this.userTotalUpdate/90*100;
          if(this.percentBadge8 >= 100){
            this.percentBadge8 = 100;
          }
        }

        if(this.userTotalUpdate > 1 || this.userTotalUpdate <= 30){
          this.percentBadge7 = this.userTotalUpdate/30*100;
          if(this.percentBadge7 >= 100){
            this.percentBadge7 = 100;
          }
        }

        if(this.userTotalUpdate > 1 || this.userTotalUpdate <= 7){
          this.percentBadge6 = this.userTotalUpdate/7*100;
          if(this.percentBadge6 >= 100){
            this.percentBadge6 = 100;
          }
        }

        if(this.userTotalUpdate >= 1){
          this.percentBadge5 = this.userTotalUpdate/1*100;
          if(this.percentBadge5 >= 100){
            this.percentBadge5 = 100;
          }
        }
        // console.log(this.percentBadge6);
      });
    } 

  ngOnInit() {
   this.getTotalBadges();
   this.getTotalPoint();


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

  getTotalBadges(){
    this.firestore
    .collection("claim-badges").doc(this._authService.getUserId())
    .get().subscribe((data:any)=>{
      console.log(data.data())
      this.totalBadges=data.data().totalBadges

      this.array=data.data();
      // console.log(Object.keys(this.array));
    })
  }

  getTotalPoint(){
    this.firestore
    .collection("users-profile").doc(this._authService.getUserId())
    .get().subscribe((data:any)=>{
      console.log(data.data().totalPoints)
      this.totalPoint=data.data().totalPoints
    })
  }

  
}
