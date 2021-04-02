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
  public result: any[] = [];
  map: L.Map;
  public markerPoint:any;
  constructor(
    private modalCtrl: ModalController,
    private route: Router,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.poiItems = JSON.parse(localStorage.getItem("addpoiData"));
    console.log(this.poiItems);
  }

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
    this.markerPoint = L.marker([3.1209, 101.6538], {myCustomId: 1001});
     console.log(this.markerPoint);
     console.log(this.markerPoint.options.myCustomId);
    //  this.markerPoint.bindPopup('<p>UM is HERE!!</p>');
    //  this.markerPoint.on('click', onClick, this);
    //  this.markerPoint.addTo(this.map);
     //function for add marker id to db

    //call this function to store POI data in db
     this.addStatic();
     this.markerPoint = L.marker([]);
     L.featureGroup([this.markerPoint])
        .bindPopup('Hello world!')
        .on('click', function() { alert('Clicked on a group!'); })
        .addTo(this.map);


    //function when click poi, go to page info
    function onClick() {
      console.log(this.poiItems);
      // console.log(Object.keys(this.poiItems).map((key) => [Number(key), this.poiItems[key]]));
      // console.log(this.poiItems[0]);
      // console.log(this.poiItems[0].poiID);
      // console.log(this.markerPoint.options.myCustomId);

      console.log(this.poiItems.length);
      //pull out all the poi ID
      for (let i = 0; i < this.poiItems.length; i++) {
        this.result.push(this.poiItems[i].poiID);
        console.log(this.result);
      }
      //check if the current POI is same in the db
      console.log(Array.isArray(this.result));
      console.log(this.result.includes(this.markerPoint.options.myCustomId));
      let navigationExtra: NavigationExtras = {
        state: {
          index: this.result
        }
      }
      this.route.navigate(['/poi-info'], navigationExtra);
    }

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

  //function create new marker
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

   addStatic() {
    if (this.poiItems == null) {
      localStorage.setItem("addpoiData", JSON.stringify([{ "poiID": this.markerPoint.options.myCustomId, "latitude": this.markerPoint._latlng.lat, "longitude": this.markerPoint._latlng.lng }]))
      this.refresh();
    }
    // if (this.poiItems !== null){
    //   this.poiItems.push(
    //     {
    //       poiID: this.markerPoint.options.myCustomId
    //     }
    //   );
    //   localStorage.setItem("addpoiData", JSON.stringify(this.poiItems));
    // }
  }
}
