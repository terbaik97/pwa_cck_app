import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-badge-contribution-claim4',
  templateUrl: './badge-contribution-claim4.page.html',
  styleUrls: ['./badge-contribution-claim4.page.scss'],
})
export class BadgeContributionClaim4Page implements OnInit {
  //usable
  public usableBadge: any;
  public usableBorder: any;
  //
  public claimedContBadge4: any;
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
    this.claimedContBadge4=true;
    // this.update('ab77defe-3508-4715-845c-8cb40eb0fb3f', this.claimedContBadge4);
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
    recordBorder['claimedContBadge4'] = record;
    this.firebaseService.update_claimed_badge(id, recordBorder);
  }

  updateUsable(id, record){
    let usableBadge = {};
    usableBadge['usableBadge8'] = record;
    usableBadge['usableBorder2'] = record;
    this.firebaseService.update_usable_badge(id, usableBadge);
  }
}
