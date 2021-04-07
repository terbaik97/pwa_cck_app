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
  constructor(
    private modalCtrl: ModalController,
    private route: Router,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.refresh();
    //Store first POI Data
    if (this.poiItems == null) {
      localStorage.setItem("addpoiData", JSON.stringify([{ "poiID": '', "x": '', "y": '' }]))
      this.refresh();
    }
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

    //loop is for display all marker
    for (let i = 0; i < this.poiItems.length; i++) {
      this.markerPoints = L.marker([this.resultLat[i], this.resultLng[i]]);
      this.markerPoints.bindPopup('<p>UM is HERE!!</p>');
      this.markerPoints.on('click', this.onClick, this);
      this.markerPoints.addTo(this.map);
      this.markerPoints.ID=i;
    }

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
    this.newPOIMarker.bindPopup('<p>UM is HERE!!</p>');
    this.newPOIMarker.on('click', this.onClick, this);
    this.newPOIMarker.addTo(this.map);

    //dummy id for putting new id
    let dummyID;

    for (let i = 0; i <= this.poiItems.length; i++) {
      dummyID=i;
    }

    //call this function to store new POI created in db
    this.addStatic(this.newPOIMarker.ID=dummyID);

    //Call function to see lat and longitude
    // POIlatlng();

    //function when the marker is placed down
    // function POIlatlng(){
    //   let lat = e.latlng.lat;
    //   let lon = e.latlng.lng;

    //   console.log('lat: ', lat);
    //   console.log('lon: ', lon);
    // }
  }

  //When user click this, it will popup modal
  async  modalPopupClick(e) {
    const alert = await this.alertCtrl.create({
      header: 'Create POI here',
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

  addStatic(id) {
     //Store other POI Data
    if (this.poiItems !== null && this.poiItems.length>0){
      this.poiItems.push(
        {
          poiID: id,
          x: this.newPOIMarker._latlng.lat,
          y: this.newPOIMarker._latlng.lng
        }
      );
      localStorage.setItem("addpoiData", JSON.stringify(this.poiItems));
    }

  }

  //Retreive and Store all POI id,latitude and logitude in variables
  retrievePOIdata(){
    
    if(this.poiItems.length !== null){
      for (let i = 0; i < this.poiItems.length; i++) {
        this.resultID.push(this.poiItems[i].poiID);
        this.resultLat.push(this.poiItems[i].x);
        this.resultLng.push(this.poiItems[i].y);
      }
    }
  }

  //function when click poi, go to page info
  onClick(e) {

    //Go to page poi based on ID of each marker
    let navigationExtra: NavigationExtras = {
      state: {
        index: e.target.ID
      }
    }
    // this.placeCoordinate = { x: this.resultLat, y: this.resultLng }
    // console.log(this.resultID);
    this.route.navigate(['/poi-info'], navigationExtra);
  }

 
}
