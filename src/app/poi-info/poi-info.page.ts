import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  public poiInfo = [];

  constructor(private route: Router,
    private activatedRoute: ActivatedRoute,) {
      this.activatedRoute.queryParams.subscribe(params => {
        if (this.route.getCurrentNavigation().extras.state) {
          this.index = this.route.getCurrentNavigation().extras.state.index;
          this.poiData = JSON.parse(localStorage.getItem("addpoiData"));
          this.poi = this.poiData[this.index];
        }
      })
     }

  ngOnInit() {

    let result = Object.values(this.poi);
    this.poiInfo = [
      {
        poiID: result[0],
        latitude: result[1],
        longitude: result[2]
      }
    ];

  }

  buttonEdit() {
    this.route.navigate(['/edit']);
  }

  buttonReport() {
    this.route.navigate(['/poi-report']);
  }

  buttonHistory(){
    this.route.navigate(['/history']);
  }
}
