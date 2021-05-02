import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-badge1',
  templateUrl: './badge1.page.html',
  styleUrls: ['./badge1.page.scss'],
})
export class Badge1Page implements OnInit {
  public borderForm: FormGroup;
  public submitAttempt: boolean = false;
  public borderChosen: any[];

  constructor(private formbuilder: FormBuilder,
    private viewCtrl: ModalController,
    ) {
    this.borderForm = formbuilder.group({
      borderChosen: ['',Validators.required],
    });
  }

  ngOnInit() {
  }

  save(){
    this.submitAttempt = true;

        if(!this.borderForm.valid){
         alert("Please choose one badge")
        }

        else {
          console.log("success!")
          this.borderChosen =[].concat(this.borderForm.value);
          console.log(this.borderChosen);
          this.viewCtrl.dismiss(this.borderForm);
        }
  }

}
