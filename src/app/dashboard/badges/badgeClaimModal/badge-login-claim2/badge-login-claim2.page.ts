import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-badge-login-claim2',
  templateUrl: './badge-login-claim2.page.html',
  styleUrls: ['./badge-login-claim2.page.scss'],
})
export class BadgeLoginClaim2Page implements OnInit {
  claimedLoginBadge2:any;
    //usable
    public usableBadge: any;
    //
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
    this.claimedLoginBadge2=true;
    this.update(this._authService.getUserId(), this.claimedLoginBadge2);
    //usable badge
    this.usableBadge=true;
    this.updateUsable(this._authService.getUserId(), this.usableBadge)
    // this.updateUsable(this._authService.getUserId(), this._authService.getUserId())
    this.router.navigate(['/badges'])
    .then(() => {
      window.location.reload();
    }); 
    this.close();
  }

  update(id, record) {
    let recordBorder = {};
    recordBorder['claimedLoginBadge2'] = record;
    this.firebaseService.update_claimed_badge(id, recordBorder);
  }

    //usable
    updateUsable(id, record){
      let usableBadge = {};
      usableBadge['usableBadge2'] = record;
      // usableBadge['id'] = record;
      this.firebaseService.update_usable_badge(id, usableBadge);
    }
}
