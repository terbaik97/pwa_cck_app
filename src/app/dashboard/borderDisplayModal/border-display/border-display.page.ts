import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-border-display',
  templateUrl: './border-display.page.html',
  styleUrls: ['./border-display.page.scss'],
})
export class BorderDisplayPage implements OnInit {

  public borderForm: FormGroup;
  public submitAttempt: boolean = false;
  public borderDisplayChosen: any[];
  borderList = [];

  constructor(private formbuilder: FormBuilder,
    private modalCtrl: ModalController,
    private firebaseService: FirebaseService
    ) {
    this.borderForm = formbuilder.group({
      borderDisplayChosen: ['',Validators.required],
    });
  }

  ngOnInit() {}

  save(){
    this.submitAttempt = true;

        if(!this.borderForm.valid){
         alert("Please choose one border")
        }

        else {
          this.borderDisplayChosen=this.borderForm.value;
          this.updateRecord('1', this.borderDisplayChosen);
          this.modalCtrl.dismiss(this.borderForm);
        }
  }

  updateRecord(id, record) {
    let recordBorder = {};
    recordBorder = record;
    this.firebaseService.update_current_border(id, recordBorder);
  }
}
