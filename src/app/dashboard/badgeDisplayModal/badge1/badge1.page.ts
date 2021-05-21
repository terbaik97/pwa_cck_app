import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-badge1',
  templateUrl: './badge1.page.html',
  styleUrls: ['./badge1.page.scss'],
})
export class Badge1Page implements OnInit {
  public borderForm: FormGroup;
  public submitAttempt: boolean = false;
  public borderChosen1: any[];
  badgeList = [];

  constructor(private formbuilder: FormBuilder,
    private viewCtrl: ModalController,
    private firebaseService: FirebaseService
    ) {
    this.borderForm = formbuilder.group({
      borderChosen1: ['',Validators.required],
    });
  }

  ngOnInit() {}

  save(){
    this.submitAttempt = true;

        if(!this.borderForm.valid){
         alert("Please choose one badge")
        }

        else {
          this.borderChosen1=this.borderForm.value;
          this.updateRecord('1', this.borderChosen1);
          this.viewCtrl.dismiss(this.borderForm);
        }
  }

  updateRecord(id, record) {
    let recordBadge = {};
    recordBadge = record;
    this.firebaseService.update_current_badge(id, recordBadge);
  }
}
