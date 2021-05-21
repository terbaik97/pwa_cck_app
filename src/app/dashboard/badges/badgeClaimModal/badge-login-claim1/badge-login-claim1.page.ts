import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-badge-login-claim1',
  templateUrl: './badge-login-claim1.page.html',
  styleUrls: ['./badge-login-claim1.page.scss'],
})
export class BadgeLoginClaim1Page implements OnInit {

  public claimedLoginBadge1: any;
  constructor(private modalCtr: ModalController,
    private firebaseService: FirebaseService) { }

  ngOnInit() {
  }

  async close() {
    const closeModal: string = "Modal Closed";
    await this.modalCtr.dismiss(closeModal);
  }

  buttonClaim(){
    this.claimedLoginBadge1=true;
    this.update('1', this.claimedLoginBadge1);
    this.close();
  }

  update(id, record) {
    let recordBorder = {};
    recordBorder['claimedLoginBadge1'] = record;
    this.firebaseService.update_claimed_badge(id, recordBorder);
  }
}
