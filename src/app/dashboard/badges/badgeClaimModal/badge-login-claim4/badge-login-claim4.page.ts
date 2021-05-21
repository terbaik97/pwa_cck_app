import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-badge-login-claim4',
  templateUrl: './badge-login-claim4.page.html',
  styleUrls: ['./badge-login-claim4.page.scss'],
})
export class BadgeLoginClaim4Page implements OnInit {
  public claimedLoginBadge4: any;
  constructor(private modalCtr: ModalController,
    private firebaseService: FirebaseService) { }

  ngOnInit() {
  }

  async close() {
    const closeModal: string = "Modal Closed";
    await this.modalCtr.dismiss(closeModal);
  }

  buttonClaim(){
    this.claimedLoginBadge4=true;
    this.update('1', this.claimedLoginBadge4);
    this.close();
  }

  update(id, record) {
    let recordBorder = {};
    recordBorder['claimedLoginBadge4'] = record;
    this.firebaseService.update_claimed_badge(id, recordBorder);
  }

}
