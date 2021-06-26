import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-badge1',
  templateUrl: './badge1.page.html',
  styleUrls: ['./badge1.page.scss'],
})
export class Badge1Page implements OnInit {
  //usable
  public usableBadge1: any;
  public usableBadge2: any;
  public usableBadge3: any;
  public usableBadge4: any;
  public usableBadge5: any;
  public usableBadge6: any;
  public usableBadge7: any;
  public usableBadge8: any;
  //
  public borderForm: FormGroup;
  public submitAttempt: boolean = false;
  public borderChosen1: any[];
  badgeList = [];

  constructor(private formbuilder: FormBuilder,
    private viewCtrl: ModalController,
    private firebaseService: FirebaseService,
    private _authService:AuthService
    ) {
    this.borderForm = formbuilder.group({
      borderChosen1: ['',Validators.required],
    });

    //usable
    this.firebaseService.read_current_badge().subscribe(data => {
        
      this.badgeList = data.map(e => {
        return {
          id: e.payload.doc.id,
          borderChosen1: e.payload.doc.data()['borderChosen1'],
          borderChosen2: e.payload.doc.data()['borderChosen2'],
          borderChosen3: e.payload.doc.data()['borderChosen3'],
          borderDisplayChosen: e.payload.doc.data()['borderDisplayChosen'],
          usableBadge1: e.payload.doc.data()['usableBadge1'],
          usableBadge2: e.payload.doc.data()['usableBadge2'],
          usableBadge3: e.payload.doc.data()['usableBadge3'],
          usableBadge4: e.payload.doc.data()['usableBadge4'],
          usableBadge5: e.payload.doc.data()['usableBadge5'],
          usableBadge6: e.payload.doc.data()['usableBadge6'],
          usableBadge7: e.payload.doc.data()['usableBadge7'],
          usableBadge8: e.payload.doc.data()['usableBadge8'],
          usableBorder: e.payload.doc.data()['usableBorder'],
        };
      })
      // console.log(this.badgeList);
      for(let i = 0; i < this.badgeList.length; i++){
        // this.usableBadge1.push(days[this.convertedDate[i].getDay()]);
        if(this.badgeList[i].id === this._authService.getUserId()){
          this.usableBadge1 = this.badgeList[i].usableBadge1;
          this.usableBadge2 = this.badgeList[i].usableBadge2;
          this.usableBadge3 = this.badgeList[i].usableBadge3;
          this.usableBadge4 = this.badgeList[i].usableBadge4;
          this.usableBadge5 = this.badgeList[i].usableBadge5;
          this.usableBadge6 = this.badgeList[i].usableBadge6;
          this.usableBadge7 = this.badgeList[i].usableBadge7;
          this.usableBadge8 = this.badgeList[i].usableBadge8;
        }
      }
      // console.log(this.usableBadge1);
    });
    //
  }

  ngOnInit() {}

  save(){
    this.submitAttempt = true;

        if(!this.borderForm.valid){
         alert("Please choose one badge")
        }

        else {
          this.borderChosen1=this.borderForm.value;
          this.updateRecord(this._authService.getUserId(), this.borderChosen1);
          this.viewCtrl.dismiss(this.borderForm);
        }
  }

  updateRecord(id, record) {
    let recordBadge = {};
    recordBadge = record;
    this.firebaseService.update_current_badge(id, recordBadge);
  }
}
