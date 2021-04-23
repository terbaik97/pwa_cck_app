import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { PoiService } from '../api/poi.service';
import { ApiService } from '../services/api.service';
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
    console.log("data")
    console.log(this.data.name)
    this.id = this.data.id
    // console.log( this.data[0]["fields"]);
    this.fields = this.data.fields;
    console.log(this.data)
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
