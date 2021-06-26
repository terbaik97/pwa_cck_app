import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-badge-login-claim4',
  templateUrl: './badge-login-claim4.page.html',
  styleUrls: ['./badge-login-claim4.page.scss'],
})
export class BadgeLoginClaim4Page implements OnInit {
  public claimedLoginBadge4: any;
  //usable
  public usableBadge: any;
  public usableBorder: any;
  //
  constructor(private modalCtr: ModalController,
    private firebaseService: FirebaseService,
    private _authService:AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  async close() {
    const closeModal: string = "Modal Closed";
    await this.modalCtr.dismiss(closeModal);
  }

  buttonClaim(){
    this.claimedLoginBadge4=true;
    this.update(this._authService.getUserId(), this.claimedLoginBadge4);
    //Usable Badge
    this.usableBadge=true;
    this.updateUsable(this._authService.getUserId(), this.usableBadge)
    //Usable Border
    this.usableBorder=true;
    this.updateUsable(this._authService.getUserId(), this.usableBorder)
    this.router.navigate(['/badges'])
    .then(() => {
      window.location.reload();
    }); 
    this.close();
  }

  update(id, record) {
    let recordBorder = {};
    recordBorder['claimedLoginBadge4'] = record;
    this.firebaseService.update_claimed_badge(id, recordBorder);
  }

  //usable
  updateUsable(id, record){
    let usableBadge = {};
    usableBadge['usableBadge4'] = record;
    usableBadge['usableBorder'] = record;
    this.firebaseService.update_usable_badge(id, usableBadge);
  }
}
