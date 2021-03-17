import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.scss'],
})
export class SearchModalComponent {

  pOIData: any = [];
  noResult=false;

  constructor(private modalCtrl: ModalController) {
    this.initializePOIData();
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
        console.log(this.noResult);
      }
      else{
        this.noResult = false;
        console.log(this.noResult);
      }
    }

   }

  dismissModal(){
    this.modalCtrl.dismiss();
  }

  //search functionality
  initializePOIData(){
    this.pOIData = [
      {
        "name": "Toilet",
        "code": "01"
      },
      {
        "name": "Cafe",
        "code": "02"
      }
    ];
  }
}
