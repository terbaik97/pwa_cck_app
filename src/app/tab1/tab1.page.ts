import { Component , OnInit, OnDestroy } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy {
  map: L.Map;
  constructor() {}

  ngOnInit() {}

  ionViewDidEnter() {
    console.log(this.map);
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

    setTimeout(() => {
      this.map.invalidateSize();
    },0);
  }

  // Remove map when we have multiple map object
  ngOnDestroy() {
    // this.map.remove();
    // document.getElementById("mapId").outerHTML = "";
  }
}
