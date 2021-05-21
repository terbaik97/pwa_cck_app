import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { PoiService } from '../api/poi.service';
@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.scss'],
})
export class SearchModalComponent implements OnInit {

  pOIData: any = [];
  noResult=false;
  title = 'angular-text-search-highlight';
  searchText = '';
 
  all_poi: any;
  data: any;
  constructor(private modalCtrl: ModalController, private _poiService:PoiService, private route: Router,) {
    this.initializePOIData();
   }

  ngOnInit() {
   console.log(this.FilterPOIData);
   if(this.FilterPOIData){
     this.noResult = false;
   }

    this._poiService.getAllPoi().subscribe((res: any)=>{
      if(res){ 
        console.log(res.data);
        this.data = res.data
       
        
      } 
   });
  }

   FilterPOIData(data:any){
    this.initializePOIData();
    const val = data.target.value;
    if(val && val.trim() !== ''){
      this.pOIData = this.pOIData.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase())>-1);
      })
      if (this.pOIData.length===0){
        this.noResult = true;
        // console.log(this.noResult);
      }
      if (this.pOIData.length!==0){
        this.noResult = false;
        // console.log(this.noResult);
      }
      if(data.target.value.length ===1 ){
        this.noResult = false;
      }
    }
   }

  dismissModal(){
    this.modalCtrl.dismiss();
  }

  //search functionality
  initializePOIData(){
    this._poiService.getAllPoi().subscribe( data => {
      this.pOIData = data;
    })
  }

  onClick(poi_latitude , poi_longitude) {
    console.log(poi_latitude + "<br>"+poi_longitude);

    let navigationExtra: NavigationExtras = {
      state: {
        index: {
           lat: poi_latitude,
           lng: poi_longitude
        }
      }
    }
    this.modalCtrl.dismiss();
    this.route.navigate(['/poi-info'], navigationExtra);

      }


}
