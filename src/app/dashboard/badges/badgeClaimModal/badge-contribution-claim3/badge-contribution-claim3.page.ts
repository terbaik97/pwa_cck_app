import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-badge-contribution-claim3',
  templateUrl: './badge-contribution-claim3.page.html',
  styleUrls: ['./badge-contribution-claim3.page.scss'],
})
export class BadgeContributionClaim3Page implements OnInit {

  public claimedContBadge3: any;
  constructor(private modalCtr: ModalController,
    private firebaseService: FirebaseService) { }

  ngOnInit() {
  }

  async close() {
    const closeModal: string = "Modal Closed";
    await this.modalCtr.dismiss(closeModal);
  }

  buttonClaim(){
    this.claimedContBadge3=true;
    this.update('1', this.claimedContBadge3);
    this.close();
  }

  update(id, record) {
    let recordBorder = {};
    recordBorder['claimedContBadge3'] = record;
    this.firebaseService.update_claimed_badge(id, recordBorder);
  }

}
