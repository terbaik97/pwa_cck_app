import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
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
  id: string
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
    // store data for id , coordinate x and
    this.poiInfo = [
      {
        poiID: result[0],
        latitude: result[1],
        longitude: result[2]
      }
    ];
   console.log(this.poiInfo);



  }

  buttonEdit() {
    //Go to page poi based on ID of each marker
    let navigationExtra: NavigationExtras = {
      state: {
        index: this.index
      }
    }
    this.route.navigate(['/edit'], navigationExtra);
  }

  buttonReport() {
    this.route.navigate(['/poi-report']);
  }

  buttonHistory(){
    this.route.navigate(['/history']);
  }
}
