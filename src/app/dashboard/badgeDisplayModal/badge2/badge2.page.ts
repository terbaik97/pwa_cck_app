import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-badge2',
  templateUrl: './badge2.page.html',
  styleUrls: ['./badge2.page.scss'],
})
export class Badge2Page implements OnInit {
  public borderForm: FormGroup;
  public submitAttempt: boolean = false;
  public borderChosen2: any[];
  badgeList = [];

  constructor(private formbuilder: FormBuilder,
    private modalCtrl: ModalController,
    private firebaseService: FirebaseService
    ) {
    this.borderForm = formbuilder.group({
      borderChosen2: ['',Validators.required],
    });
  }

  ngOnInit() {}

  save(){
    this.submitAttempt = true;

        if(!this.borderForm.valid){
         alert("Please choose one badge")
        }

        else {
          this.borderChosen2=this.borderForm.value;
          this.updateRecord('1', this.borderChosen2);
          this.modalCtrl.dismiss(this.borderForm);
        }
  }

  updateRecord(id, record) {
    let recordBadge = {};
    recordBadge = record;
    this.firebaseService.update_current_badge2(id, recordBadge);
  }
}
