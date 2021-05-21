import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-badge-login-claim2',
  templateUrl: './badge-login-claim2.page.html',
  styleUrls: ['./badge-login-claim2.page.scss'],
})
export class BadgeLoginClaim2Page implements OnInit {
  claimedLoginBadge2:any;
  constructor(private modalCtr: ModalController,
    private firebaseService: FirebaseService,) { }

  ngOnInit() {
  }

  async close() {
    const closeModal: string = "Modal Closed";
    await this.modalCtr.dismiss(closeModal);
  }

  buttonClaim(){
    this.claimedLoginBadge2=true;
    this.update('1', this.claimedLoginBadge2);
    this.close();
  }

  update(id, record) {
    let recordBorder = {};
    recordBorder['claimedLoginBadge2'] = record;
    this.firebaseService.update_claimed_badge(id, recordBorder);
  }
}
