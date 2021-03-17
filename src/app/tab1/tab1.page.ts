import { Component , OnInit } from '@angular/core';
import * as L from 'leaflet';

import { SearchModalComponent } from '../search-modal/search-modal.component';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  map: L.Map;
  constructor(
    private modalCtrl: ModalController,
    private route: Router
  ) {}

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

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: SearchModalComponent
    });

    await modal.present();
  }
}