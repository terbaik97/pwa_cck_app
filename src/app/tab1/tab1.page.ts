import { Component , OnInit } from '@angular/core';
import * as L from 'leaflet';
//imports for showing leaflet marker
import "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/images/marker-icon-2x.png";
import { SearchModalComponent } from '../search-modal/search-modal.component';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  // poiItems:[];
  map: L.Map;
  constructor(
    private modalCtrl: ModalController,
    private route: Router,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {

  }

  // refresh() {
  //   this.poiItems = JSON.parse(localStorage.getItem("addpoiData"));
  //   console.log(this.poiItems);
  // }

  ionViewDidEnter() {
    // console.log(this.map);
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
      // useCache: true,
	    // crossOrigin: true
     });
    layer.addTo(this.map);

     //marker go to poi-info
     const markPoint = L.marker([3.1209, 101.6538], {myCustomId: 1001});
     console.log(markPoint);
     console.log(markPoint.options.myCustomId);
     markPoint.bindPopup('<p>UM is HERE!!</p>');
     markPoint.on('click', onClick, this);
     //function for add marker id to db
    //  addStatic();
    // function addStatic() {
    //   if (this.poiItems == null) {
    //     localStorage.setItem("addpoiData", JSON.stringify([{ "poiID": markPoint.options.myCustomId }]))
    //     this.refresh();
    //   }else {
    //     this.poiItems.push(
    //       {
    //         poiID: markPoint.options.myCustomId
    //       }
    //     );
    //     localStorage.setItem("addpoiData", JSON.stringify(this.poiItems));
    //   }
    // }

    //function when click poi, go to page info
    function onClick() {
      // alert(this.getLatLng());
      this.route.navigate(['/poi-info']);
    }

    markPoint.addTo(this.map);
    //When user click on map, pop up will appear.
    this.map.on('click', this.handleButtonClick, this);

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

  onMapClick(e) {
    let POIMarker = L.marker(e.latlng);
    POIMarker.addTo(this.map);

    //Call function to see lat and longitude
    POIlatlng();

    //function when the marker is placed down
    function POIlatlng(){
      let lat = e.latlng.lat;
      let lon = e.latlng.lng;

      console.log('lat: ', lat);
      console.log('lon: ', lon);
    }
  }

  async  handleButtonClick(e) {
    console.log(e.latlng);
    const alert = await this.alertCtrl.create({
      header: 'Create POI here?',
      message: '',
      // buttons: ['No', 'Yes']
      buttons: [
                {
                  text: 'No'
                },
                {
                  text: 'Yes',
                  handler: data => {
                      // console.log(JSON.stringify(data)); //to see the object
                      // console.log(data);
                      this.onMapClick(e);
                  }
                }
      ]
    });

    await alert.present();
  }
}
