import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit() {
  }

}
