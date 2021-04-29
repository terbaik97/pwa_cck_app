import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { PoiService } from '../api/poi.service';
import { ApiService } from '../services/api.service';
import * as L from 'leaflet';
//imports for showing leaflet marker
import "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/images/marker-icon-2x.png";
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

  id: string;
  data: any;
  checkdata: any;
  map: L.Map;
  fields: any;
  constructor(private route: Router,
    private activatedRoute: ActivatedRoute,
    private _poiService: PoiService) {
      this.activatedRoute.queryParams.subscribe(params => {
        if (this.route.getCurrentNavigation().extras.state) {
          this.index = this.route.getCurrentNavigation().extras.state.index;
          console.log(this.index);
          // this.poiData = JSON.parse(localStorage.getItem("addpoiData"));
          // this.poi = this.poiData[this.index];
        }
      })
     }

  ngOnInit() {

    let result = Object.values(this.index);

    console.log(result)
    // store data for id , coordinate x and 
    this.poiInfo = {
      "lat": result[0],
      "lng": result[1]
      
    }
      
       
    

  console.log(this.poiInfo);
   this._poiService.getPoibyCoordinate(this.poiInfo).subscribe((res: any) => {
     console.log(res);
    if (res === ""){
      this.checkdata = false;
      this.data = "";
    }
    this.checkdata = true;
    this.data = res;
    this.id = this.data.id
    this.fields = this.data.fields;
    console.log(this.data)
    this.map = L.map('map', {
      center: [this.data.poi_latitude, this.data.poi_longitude],
      zoom: 18,
      renderer: L.canvas
    })

    var layer = L.tileLayer('assets/tiles/{z}/{x}/{y}.png', {
      maxNativeZoom: 18,
      minNativeZoom: 18,
     });
    layer.addTo(this.map);

    var marker = L.marker([this.data.poi_latitude, this.data.poi_longitude])
    .bindPopup('Place you search is here')
    .openPopup();
    marker.addTo(this.map);
    });


 


  }

  buttonEdit() {
    //Go to page poi based on ID of each marker
    let navigationExtra: NavigationExtras = {
      state: {
        index: this.index
      }
    }   

    this.route.navigate(['/poi-edit'], navigationExtra);
  }

  buttonReport(id) {
    console.log(id);
    this.route.navigate(['/poi-report',id]);
  }

  buttonHistory(id){
    console.log(id);
    this.route.navigate(['/history',id]);
  }
}
