import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { PoiService } from '../api/poi.service';
import { AlertMessageService } from '../services/alert-message.service';
import { AuthService } from '../services/auth.service';
import { ProfileService } from '../services/profile.service';
@Component({
  selector: 'app-poi-report',
  templateUrl: './poi-report.page.html',
  styleUrls: ['./poi-report.page.scss'],
})
export class PoiReportPage implements OnInit {
  public reportForm: FormGroup;
  public poi= [];
  public poiData: any[];
  public index: any;
  public poiInfo = [];
  public submitAttempt: boolean = false;
  data: any;
  id = "";
  historyData:[];
  submitReport :any;
  submitRevert :any;
  length: any;
  constructor(
    private formbuilder: FormBuilder, 
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _poiService: PoiService,
    private route: ActivatedRoute,
    private alertMessage:AlertMessageService,
    public alertController: AlertController,
    private _authService:AuthService,
    private _profileService:ProfileService,
    
    
    ) {
    this.reportForm = formbuilder.group({
      name: ['',Validators.required],
      report_reason: ['',Validators.required],
      comments: ['']
    });

    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.index = this.router.getCurrentNavigation().extras.state.index;
        this.poiData = JSON.parse(localStorage.getItem("addpoiData"));
        this.poi = this.poiData[this.index];
      }
    })
   }

 

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    
    this._poiService.showPoibyId(this.id).subscribe((res: any) => {
    this.data = res;
    this.id=this.data.id
    this.reportForm.patchValue({
      name: this.data.name,
    });
    });
    this.show_poi_version()
    this.submitRevert=false;
    this.submitReport=true;
  }


  revert(poi_id: any,id: any,whodunnit: any){
    
    this._poiService.revert_item_poi_version(id,whodunnit,poi_id).subscribe((res:any)=>{
      
      this.alertMessage.presentAlert("Successfully revert changes on poi")
      this._profileService.getProfile(this._authService.getUserEmail()).subscribe((res:any)=>{
        console.log(res);
        // this._authService.setDataInLocalStorage('user_point', res.data.user.user_point)
      })
      this.router.navigate(['/'])
      
    })
    
  }
  report(poi_id: any,id: any,whodunnit: any){
    console.log(id,whodunnit,poi_id)
    this.submitRevert=true;
    this.submitReport=false;
    // connect with backend report
    this._poiService.report_item_poi_version(id,whodunnit,poi_id).subscribe((res:any)=>{
      
      this.alertMessage.presentAlert("Successfully report on poi")
     
    })
  }

  show_poi_version(){
    this._poiService.getPoiVersion(this.id).subscribe((res: any) => {
      this.historyData = res;
      this.length=this.historyData.length
      });
  }


  async presentAlertReport(poi_id: any,id: any,whodunnit: any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Report changes',
      // subHeader: 'Subtitle',
      message: 'Are you confirm to report ?',
      buttons: [
        {
        text: 'Cancel',
        }, 
        {
          text: 'Yes',
          handler: () => {
            this.report(poi_id,id,whodunnit);
          }
        }
        ]
    });
    
    await alert.present();
    
  }


  async presentAlertRevert(poi_id: any,id: any,whodunnit: any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Revert changes',
      // subHeader: 'Subtitle',
      message: 'Are you confirm to revert ?',
      buttons: [
        {
        text: 'Cancel',
        }, 
        {
          text: 'Yes',
          handler: () => {
            this.revert(poi_id,id,whodunnit);
          }
        }
        ]
    });
    
    await alert.present();
    
  }

  async presentAlertRevertReport(poi_id: any,id: any,whodunnit: any){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Revert changes',
      // subHeader: 'Subtitle',
      message: 'Are you confirm to report & revert ?',
      buttons: [
        {
        text: 'Cancel',
        }, 
        {
          text: 'Yes',
          handler: () => {
            this.revertReport(poi_id,id,whodunnit);
          }
        }
        ]
    });
    
    await alert.present();
  }

  revertReport(poi_id: any,id: any,whodunnit: any){
    console.log(id,whodunnit,poi_id)
    this.submitRevert=true;
    this.submitReport=false;
    // connect with backend report
    this._poiService.revertReport(id,whodunnit,poi_id).subscribe((res:any)=>{
      console.log(res)
      this.alertMessage.presentAlert("Successfully report and report on poi")
      this._profileService.getProfile(this._authService.getUserEmail()).subscribe((res:any)=>{
        console.log(res);
        // this._authService.setDataInLocalStorage('user_point', res.data.user.user_point)
      })
      this.router.navigate(['/'])
     
    })
  }

}
