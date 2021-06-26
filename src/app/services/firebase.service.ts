import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

const badgeChosen = { 
  id:'',
  borderChosen1: '', 
  borderChosen2: '', 
  borderChosen3:'', 
  borderDisplayChosen: '' ,
  usableBorder: '',
  usableBorder2:'',
  usableBadge1:'', 
  usableBadge2: '', 
  usableBadge3:'', 
  usableBadge4:'',
  usableBadge5:'',
  usableBadge6:'',
  usableBadge7:'',
  usableBadge8:'',
 };

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {
  collectionName = 'Current-Badge';
  collectionClaimed = 'claim-badges';
  collectionProfile = 'users-profile';
  collectionUserAction = 'user_actions';
  userCollection: AngularFirestoreCollection<any>;
  tutorials: Observable<any[]>;

  dbQuestionCollection: AngularFirestoreCollection<{}>;
  dbQuestions$: Observable<{}>;
  constructor(
    private firestore: AngularFirestore,
    private _authService:AuthService,
    private router: Router,) { }

  create_user(record: any , totalBadges) {
    console.log(record)
     this.firestore.collection('users-profile').doc(record[0]['id']).set(
      {
        id: record[0]['id'],
        full_name: record[0]['full_name'],
        avatar: record[0]['avatar'] ? record[0]['avatar'] : '',
        name: this._authService.getUserNickname(),
        totalBadges: totalBadges ? totalBadges : 0,
        totalPoints: 100,
        
       
      });
      //  this.firestore.collection('claim-badges').doc(record[0]['id']).set(
      //   {
      //     claimedContBadge1:
      //     true,
      //     claimedContBadge2:
      //     true,
      //     claimedContBadge3:
      //     true,
      //     claimedContBadge4:
      //     true,
      //     claimedLoginBadge1:
      //     true,
      //     claimedLoginBadge2:
      //     true,
      //     claimedLoginBadge3:
      //     true,
      //     claimedLoginBadge4:
      //     true,
      //     totalBadges: 0
         
      //   });

        
  }

  create_user_login(record: any , totalBadges) {
    console.log(record)
     this.firestore.collection('users-profile').doc(record['user']['id']).set(
      {
        id: record['user']['id'],
        full_name: record['user']['full_name'],
        avatar: record['user']['avatar'] ? record['user']['avatar'] : '',
        name: this._authService.getUserNickname(),
        totalBadges: totalBadges ? totalBadges : 0,
        totalPoints: 100,
        
       
      });
       this.firestore.collection('claim-badges').doc(record['user']['id']).set(
        {
          claimedContBadge1:
          '',
          claimedContBadge2:
          '',
          claimedContBadge3:
          '',
          claimedContBadge4:
          '',
          claimedLoginBadge1:
          '',
          claimedLoginBadge2:
          '',
          claimedLoginBadge3:
          '',
          claimedLoginBadge4:
          '',
          totalBadges: 0
         
        });

        
  }

  update_user(record: any , recordID:any) {
    console.log(record)
    console.log(recordID)
    this.firestore.doc(this.collectionProfile + '/' + recordID).update(record).then((value)=>{
      console.log("Success");
    }, (reject)=>{
      console.log("Failed");
    });
  }

  read_current_badge() {
    return this.firestore.collection(this.collectionName).snapshotChanges();
  }

  update_current_badge(recordID, record) {

    this.firestore.doc(this.collectionName + '/' + recordID).update(record).then((value)=>{
      console.log("Success");
    });
  }

  update_current_badge2(recordID, record) {
    this.firestore.doc(this.collectionName + '/' + recordID).update(record);
  }
  // delete_student(record_id) {
  //   this.firestore.doc(this.collectionName + '/' + record_id).delete();
  // }

  update_current_border(recordID, record) {
    this.firestore.doc(this.collectionName + '/' + recordID).update(record);
  }

  read_claimed_badge() {
    return this.firestore.collection(this.collectionClaimed).snapshotChanges();
  }

  update_claimed_badge(recordID, record){
    
    console.log(record);
    // this.firestore.collection('claim-badges').doc(record).set(record);
    this.firestore.doc(this.collectionClaimed + '/' + recordID).update(record);
    
  }


  // create user_actions
  create_user_actions(record: any , user_actions: any) {
    console.log(record);
    // console.log(user_actions.data[0]['id']);
    for ( var i = 0 ; i < user_actions.data.length; i++ ){
      this.firestore.collection('user_actions').doc(record).collection('create').doc(user_actions.data[i]["id"]).set(
        {
          
          created_at: user_actions.data[i]["created_at"],
          poi_id: user_actions.data[i]["poi_id"],
          status: user_actions.data[i]["status"],
          updated_at: user_actions.data[i]["updated_at"],
          user_action:  user_actions.data[i]["action_user"] ,
          user_id:  user_actions.data[i]["user_id"]
          
        });
    } 
 }

 update_user_actions(record: any , user_actions: any) {
  
  for ( var i = 0 ; i < user_actions.data.length; i++ ){
    this.firestore.collection('user_actions').doc(record).collection('update').doc(user_actions.data[i]["id"]).set(
      {
        
        created_at: user_actions.data[i]["created_at"],
        poi_id: user_actions.data[i]["poi_id"],
        status: user_actions.data[i]["status"],
        updated_at: user_actions.data[i]["updated_at"],
        user_action:  user_actions.data[i]["action_user"] ,
        user_id:  user_actions.data[i]["user_id"]
        
      });
  }
}

  //usable badge
  update_usable_badge(recordID, record){
    console.log(record);
    this.firestore.doc('Current-Badge' + '/' + recordID).update(record);
  }

  create_current_badge(){
    return  this.firestore
        .collection(this.collectionName).doc(this._authService.getUserId())
        .set(badgeChosen)
        // .then(response => { console.log(response) }, error => reject(error));
  }

  read_user(){
    return this.firestore.collection(this.collectionProfile).snapshotChanges();
  }
} 

