import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-badge-contribution-claim2',
  templateUrl: './badge-contribution-claim2.page.html',
  styleUrls: ['./badge-contribution-claim2.page.scss'],
})
export class BadgeContributionClaim2Page implements OnInit {

  public claimedContBadge2: any;
  constructor(private modalCtr: ModalController,
    private firebaseService: FirebaseService) { }

  ngOnInit() {
  }

  async close() {
    const closeModal: string = "Modal Closed";
    await this.modalCtr.dismiss(closeModal);
  }

  buttonClaim(){
    this.claimedContBadge2=true;
    this.update('1', this.claimedContBadge2);
    this.close();
  }

  update(id, record) {
    let recordBorder = {};
    recordBorder['claimedContBadge2'] = record;
    this.firebaseService.update_claimed_badge(id, recordBorder);
  }

}
