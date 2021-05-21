import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-badge-contribution-claim4',
  templateUrl: './badge-contribution-claim4.page.html',
  styleUrls: ['./badge-contribution-claim4.page.scss'],
})
export class BadgeContributionClaim4Page implements OnInit {
  public claimedContBadge4: any;
  constructor(private modalCtr: ModalController,
    private firebaseService: FirebaseService) { }

  ngOnInit() {
  }

  async close() {
    const closeModal: string = "Modal Closed";
    await this.modalCtr.dismiss(closeModal);
  }

  buttonClaim(){
    this.claimedContBadge4=true;
    this.update('1', this.claimedContBadge4);
    this.close();
  }

  update(id, record) {
    let recordBorder = {};
    recordBorder['claimedContBadge4'] = record;
    this.firebaseService.update_claimed_badge(id, recordBorder);
  }
}
