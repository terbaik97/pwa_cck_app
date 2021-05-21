import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-badge-login-claim3',
  templateUrl: './badge-login-claim3.page.html',
  styleUrls: ['./badge-login-claim3.page.scss'],
})
export class BadgeLoginClaim3Page implements OnInit {

  public claimedLoginBadge3: any;
  constructor(private modalCtr: ModalController,
    private firebaseService: FirebaseService) { }

  ngOnInit() {
  }

  async close() {
    const closeModal: string = "Modal Closed";
    await this.modalCtr.dismiss(closeModal);
  }

  buttonClaim(){
    this.claimedLoginBadge3=true;
    this.update('1', this.claimedLoginBadge3);
    this.close();
  }

  update(id, record) {
    let recordBorder = {};
    recordBorder['claimedLoginBadge3'] = record;
    this.firebaseService.update_claimed_badge(id, recordBorder);
  }

}
