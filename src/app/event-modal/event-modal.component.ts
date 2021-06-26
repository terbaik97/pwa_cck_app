import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PoiService } from '../api/poi.service';

@Component({
  selector: 'app-event-modal',
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.scss'],
})
export class EventModalComponent implements OnInit {
event=[]
array = []
dateEvent:any
result:{}
  constructor(
    private modalCtrl: ModalController,
    private _poiService:PoiService
  ) { }

  ngOnInit() {



    this._poiService.getEventPoi().subscribe((event:any)=>{
      var month = new Array();
      month[0] = "January";
      month[1] = "February";
      month[2] = "March";
      month[3] = "April";
      month[4] = "May";
      month[5] = "June";
      month[6] = "July";
      month[7] = "August";
      month[8] = "September";
      month[9] = "October";
      month[10] = "November";
      month[11] = "December";
      this.event = event.data;
      // // let date =new Date(event.data[1]['event_date']).toISOString();
      // // console.log(new Date(event.data[1]['event_date']).toISOString())
      // // console.log(new Date(date).getDay());
      // for(var i=0;i<event.data.length;i++){
      //   let dateOfMonth =month[new Date(new Date(event.data[i]['event_date']).toISOString()).getMonth()];
      //   let day=new Date(new Date(event.data[i]['event_date']).toISOString()).getDay();
      //   console.log(dateOfMonth);
      //   console.log(day);
      //   this.array.push([dateOfMonth,day]);
        
      // }
      
      // this.event.concat(this.array)
      // this.dateEvent =this.array;
      // console.log(this.event.concat(this.array));
    })
  }

  dismissModal(){
    this.modalCtrl.dismiss();
  }

  getDateofevent(data){
    return data.getDate();
  }
}
