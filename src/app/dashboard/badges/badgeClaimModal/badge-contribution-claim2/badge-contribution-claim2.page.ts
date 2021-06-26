import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-badge-contribution-claim2',
  templateUrl: './badge-contribution-claim2.page.html',
  styleUrls: ['./badge-contribution-claim2.page.scss'],
})
export class BadgeContributionClaim2Page implements OnInit {
  //usable
  public usableBadge: any;
  //
  public claimedContBadge2: any;
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
    this.claimedContBadge2=true;
    this.update(this._authService.getUserId(), this.claimedContBadge2);
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
    recordBorder['claimedContBadge2'] = record;
    this.firebaseService.update_claimed_badge(id, recordBorder);
  }

   //usable
   updateUsable(id, record){
    let usableBadge = {};
    usableBadge['usableBadge6'] = record;
    this.firebaseService.update_usable_badge(id, usableBadge);
  }
}
