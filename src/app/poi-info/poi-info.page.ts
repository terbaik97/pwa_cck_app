import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { PoiService } from '../api/poi.service';
import { ApiService } from '../services/api.service';
import * as L from 'leaflet';
//imports for showing leaflet marker
import "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/images/marker-icon-2x.png";
import { AuthService } from '../services/auth.service';
export class PoiInfo {
  poiID: any;
  latitude: any;
  longitude: any;
}

@Component({
  selector: 'app-poi-info',
  templateUrl: './poi-info.page.html',
  styleUrls: ['./poi-info.page.scss'],
})
export class POIInfoPage implements OnInit {
  option = {
    slidesPerView: 1.5,
    centeredSlides: true,
    loop:true,
    spaceBetween:10
  };

  public poi: PoiInfo[] = [];
  public poiData: any[];
  public index: any;

  public poiInfo: any;
  image: any;
  id: string;
  data: any;
  checkdata: any;
  map: L.Map;
  fields: any;
  baseUrl="http://127.0.0.1:3000";
  nodata: any;
  marker: L.Map;
  newPosition: any;
  userPoint = this._authService.getUserPoint();
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _poiService: PoiService,
    private _authService:AuthService
    ) {
      this.activatedRoute.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state) {
          this.index = this.router.getCurrentNavigation().extras.state.index;
        }
      })
     }

  ngOnInit() {

    let result = Object.values(this.index);
    // store data for id , coordinate x and 
    this.poiInfo = {
      "lat": result[0],
      "lng": result[1]
      
    }

   this._poiService.getPoibyCoordinate(this.poiInfo).subscribe((res: any) => {
    this.checkdata = true;
    this.data = res;
    this.id = this.data.id
    this.fields = this.data.fields;
    this.image = this.data.image_pois[0]["image"]["url"]
    console.log(this.image)

    this.map = L.map('mapView', {
      center: [this.data.poi_latitude, this.data.poi_longitude],
      zoom: 18,
      renderer: L.canvas
    })
    // this.map = L.map('map').setView([this.data.poi_latitude, this.data.poi_longitude], 18);
    var layer = L.tileLayer('assets/tiles/{z}/{x}/{y}.png', {
      maxNativeZoom: 18,
      minNativeZoom: 18,
     });
    layer.addTo(this.map);
    L.marker([this.data.poi_latitude, this.data.poi_longitude]).addTo(this.map)
    .bindPopup(this.data.name)
    .openPopup();

    this.marker = new L.marker([3.1210736296614234, 101.65362004185054],{draggable:'true'}).addTo(this.map)
    .bindPopup(this.newPosition ? this.newPosition : "move here to know distance")
    .openPopup();
   
    this.marker.on('dragend', (event) => {
      var marker = event.target;
      var position = marker.getLatLng();
      this.newPosition = position;
      
      console.log(this.map.distance([this.data.poi_latitude, this.data.poi_longitude], [this.newPosition.lat, this.newPosition.lng]))
      var popup = L.popup()
      .setLatLng([this.newPosition.lat, this.newPosition.lng])
      .setContent('Distance from ' + this.data.name + ' is ' +  this.map.distance([this.data.poi_latitude, this.data.poi_longitude], [this.newPosition.lat, this.newPosition.lng]) + ' metres ')
      .openOn(this.map);
    });

    // this.map.bindTooltip("my tooltip text").openTooltip();
    
    console.log(this.marker)
    // console.log(this.map.distance([this.data.poi_latitude, this.data.poi_longitude], [this.newPosition.lat, this.newPosition.lng]))
    
    },
    (err: any) =>{
      
      this.nodata = err.error;
    });
  }

  calculateDistance(){

    console.log(this.newPosition);
  }

  buttonEdit() {
    //Go to page poi based on ID of each marker
    let navigationExtra: NavigationExtras = {
      state: {
        index: this.index
      }
    }   

    this.router.navigate(['/poi-edit'], navigationExtra);
  }

  buttonReport(id) {
    
    this.router.navigate(['/poi-report',id]);
  }

  buttonHistory(id){
    
    this.router.navigate(['/history',id]);
  }
}
