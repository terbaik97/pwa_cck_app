import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit() {
  }

}
