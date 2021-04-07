import { Component, OnInit } from '@angular/core';
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

  constructor(private modalCtrl: ModalController, private _poiService:PoiService) {
    this.initializePOIData();
   }

  ngOnInit() {
   console.log(this.FilterPOIData);
   if(this.FilterPOIData){
     this.noResult = false;
   }
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
    this._poiService.getAllPoi('').subscribe( data => {
      this.pOIData = data;
    })
  }
}
