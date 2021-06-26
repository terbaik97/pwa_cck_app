import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-border-display',
  templateUrl: './border-display.page.html',
  styleUrls: ['./border-display.page.scss'],
})
export class BorderDisplayPage implements OnInit {

  //usable
  public usableBorder: any;
  public usableBorder2: any;
  //

  public borderForm: FormGroup;
  public submitAttempt: boolean = false;
  public borderDisplayChosen: any[];
  borderList = [];

  constructor(private formbuilder: FormBuilder,
    private modalCtrl: ModalController,
    private firebaseService: FirebaseService,
    private _authService:AuthService
    ) {
    this.borderForm = formbuilder.group({
      borderDisplayChosen: ['',Validators.required],
    });

       //usable
       this.firebaseService.read_current_badge().subscribe(data => {
        
        this.borderList = data.map(e => {
          return {
            id: e.payload.doc.id,
            borderChosen1: e.payload.doc.data()['borderChosen1'],
            borderChosen2: e.payload.doc.data()['borderChosen2'],
            borderChosen3: e.payload.doc.data()['borderChosen3'],
            borderDisplayChosen: e.payload.doc.data()['borderDisplayChosen'],
            usableBorder: e.payload.doc.data()['usableBorder'],
            usableBorder2: e.payload.doc.data()['usableBorder2'],
          };
        })
        // console.log(this.badgeList);
        for(let i = 0; i < this.borderList.length; i++){
          // this.usableBadge1.push(days[this.convertedDate[i].getDay()]);
          if(this.borderList[i].id === this._authService.getUserId()){
            this.usableBorder = this.borderList[i].usableBorder;
            this.usableBorder2 = this.borderList[i].usableBorder2;
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
         alert("Please choose one border")
        }

        else {
          this.borderDisplayChosen=this.borderForm.value;
          this.updateRecord(this._authService.getUserId(), this.borderDisplayChosen);
          this.modalCtrl.dismiss(this.borderForm);
        }
  }

  updateRecord(id, record) {
    let recordBorder = {};
    recordBorder = record;
    this.firebaseService.update_current_border(id, recordBorder);
  }
}
