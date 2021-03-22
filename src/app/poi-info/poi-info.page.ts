import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  constructor(private route: Router) { }

  ngOnInit() {
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
