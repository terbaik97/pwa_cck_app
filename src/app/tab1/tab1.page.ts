import { Component , OnInit } from '@angular/core';
import * as L from 'leaflet';
//imports for showing leaflet marker
import "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/images/marker-icon-2x.png";
import { SearchModalComponent } from '../search-modal/search-modal.component';
import { NavigationExtras,Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { PoiService } from '../api/poi.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  public poiItems: any[] = [];
  public resultID: any[] = [];
  public resultLat: any[] = [];
  public resultLng: any[] = [];
  public newPOIMarker:any;
  public markerPoints: any;
  public placeCoordinate: any;
  map: L.Map;
  data: any;
  data_length: Number;
  constructor(
    private modalCtrl: ModalController,
    private route: Router,
    private alertCtrl: AlertController,
    private _poiService:PoiService
  ) {}

  ngOnInit() {

    this.refresh();
    //Store first POI Data
    if (this.poiItems == null) {
      localStorage.setItem("addpoiData", JSON.stringify([{ "poiID": '', "latitude": '', "longitude": '' }]))
      this.refresh();
    }

    this._poiService.getAllPoi().subscribe((res: any)=>{
      if(res){ 
        console.log(res)
        console.log(res.data.length)
        this.data_length = res.data.length
        this.data = res.data
        this.retrievePOIdata();
      } 
   });

  }

  refresh() {
    this.poiItems = JSON.parse(localStorage.getItem("addpoiData"));

  }

  ionViewDidEnter() {
    if(this.map) {
      this.map.remove();
    }
    this.leafletMap();
  }

  //Load Map
  leafletMap() {
   
    this.map = L.map('mapId', {
      center: [3.1209, 101.6538],
      zoom: 18,
      renderer: L.canvas
    })

    var layer = L.tileLayer('assets/tiles/{z}/{x}/{y}.png', {
      maxNativeZoom: 18,
      minNativeZoom: 18,
     });
    layer.addTo(this.map);

     //call this function to retrieve id, longitude and latitude
     this.retrievePOIdata();

    //When user click on map, pop up will appear.
    this.map.on('click', this.modalPopupClick, this);

    setTimeout(() => {
      this.map.invalidateSize();
    },0);
  }
  async openModal() {
    const modal = await this.modalCtrl.create({
      component: SearchModalComponent
    });

    await modal.present();
  }

  nextpage() {
    this.route.navigate(['/select-campus']);
  }
  //function create new marker
  newPOIClick(e) {
    this.newPOIMarker = L.marker(e.latlng);
    this.newPOIMarker.bindPopup('<p>Create new place here !!</p>');
    this.newPOIMarker.on('click', this.onClick, this);
    this.newPOIMarker.addTo(this.map);
  }

  //When user click this, it will popup modal
  async  modalPopupClick(e) {
    const alert = await this.alertCtrl.create({
      header: 'Create new place here',
      message: 'Confirm?',
      buttons: [
                {
                  text: 'No'
                },
                {
                  text: 'Yes',
                  handler: data => {
                      this.newPOIClick(e);
                  }
                }
      ]
    });

    await alert.present();
  }

  //Retreive and Store all POI id,latitude and logitude in variables
  retrievePOIdata(){
    
  
      for (let i = 0; i < this.data_length; i++) {
        this.markerPoints = L.marker([
          this.data[i]["poi_latitude"], 
          this.data[i]["poi_longitude"] 
        ]);
        this.markerPoints.bindPopup('<p>' + this.data[i]["name"] + 'is here'  +'</p>');
        this.markerPoints.on('click', this.onClick, this);
        this.markerPoints.addTo(this.map);
        this.markerPoints.ID=i;
      }
    
  }

  //function when click poi, go to page info
onClick(e) {
console.log(e.latlng);
    //Go to page poi based on ID of each marker
    let navigationExtra: NavigationExtras = {
      state: {
        index: e.latlng
      }
    }    
    this.route.navigate(['/poi-info'], navigationExtra);
  }
}
