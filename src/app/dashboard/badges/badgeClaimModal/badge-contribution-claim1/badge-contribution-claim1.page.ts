import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-badge-contribution-claim1',
  templateUrl: './badge-contribution-claim1.page.html',
  styleUrls: ['./badge-contribution-claim1.page.scss'],
})
export class BadgeContributionClaim1Page implements OnInit {
  //usable
  public usableBadge: any;
  //
  public claimedContBadge1: any;
  constructor(private modalCtr: ModalController,
    private firebaseService: FirebaseService,
    private _authService:AuthService,
    private router: Router,) { }

  ngOnInit() {
  }

  async close() {
    const closeModal: string = "Modal Closed";
    await this.modalCtr.dismiss(closeModal);
  }

  buttonClaim(){
    this.claimedContBadge1=true;
    this.update(this._authService.getUserId(), this.claimedContBadge1);
    //usable badge
    this.usableBadge=true;
    this.updateUsable(this._authService.getUserId(), this.usableBadge)
    this.router.navigate(['/badges'])
        .then(() => {
          window.location.reload();
        }); 
    this.close();
  }

  update(id, record) {
    let recordBorder = {};
    recordBorder['claimedContBadge1'] = record;
    this.firebaseService.update_claimed_badge(id,recordBorder);
  }

    //usable
    updateUsable(id, record){
      let usableBadge = {};
      usableBadge['usableBadge5'] = record;
      this.firebaseService.update_usable_badge(id, usableBadge);
    }
}
