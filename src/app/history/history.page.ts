import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoiService } from '../api/poi.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  option = {
    slidesPerView: 1.5,
    centeredSlides: true,
    loop:true,
    spaceBetween:10
  };
  data: any;
  constructor(private router: Router,private route: ActivatedRoute, private _poiService:PoiService) { }

  ngOnInit() {
    const id: string = this.route.snapshot.params.id;
    console.log(id);
    this._poiService.getPoiVersion(id).subscribe((res: any)=>{
      this.data = res;
      console.log(this.data);
    },
    (err: any) =>{
      console.log(err.error);
    })
  }

  buttonEdit() {
    this.router.navigate(['/edit']);
  }

  buttonReport() {
    this.router.navigate(['/poi-report']);
  }

  buttonInfo(){
    this.router.navigate(['/poi-info']);
  }
}
