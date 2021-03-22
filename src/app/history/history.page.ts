import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  constructor(private route: Router) { }

  ngOnInit() {
  }

  buttonEdit() {
    this.route.navigate(['/edit']);
  }

  buttonReport() {
    this.route.navigate(['/poi-report']);
  }

  buttonInfo(){
    this.route.navigate(['/poi-info']);
  }
}
