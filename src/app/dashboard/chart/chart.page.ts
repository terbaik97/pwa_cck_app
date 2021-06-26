import {  Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { element } from 'protractor';
import { HttpClient } from '@angular/common/http';

const days = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat'
]

@Component({
  selector: 'app-chart',
  templateUrl: './chart.page.html',
  styleUrls: ['./chart.page.scss'],
})
export class ChartPage implements OnInit {
  public chartItem: any[] = [];
  public chartWeekData={};
  public chartDaily: any[] = [];
  updatePoints=[];
  convertedDate=[];
  convertedDay=[];
  colledtedDay={
    Sun:0,
    Mon:0,
    Tue:0,
    Wed:0,
    Thu:0,
    Fri:0,
    Sat:0
  };
  name = this._authService.getUserNickname();
  @ViewChild('barCanvas') private barCanvas: ElementRef;

  barChart: any;
  public array: any[] = [];
  public array2: any[] =[];
  dayMonday= [];
  dayTuesday= [];
  dayWednesday= [];
  dayThursday= [];
  dayFriday= [];
  daySaturday= [];
  daySunday= [];
  getDay = 'Monday';
  constructor(
    private route: Router,
    private firebaseService: FirebaseService,
    private firestore: AngularFirestore,
    private _authService:AuthService,
    public http: HttpClient ) {

 
  }

  ngOnInit() {

    this.getUserActivity()
  }

  ngAfterViewInit() {}

  //chart code
  barChartMethod() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
        datasets: [{
          data: [
            this.colledtedDay.Sun,
            this.colledtedDay.Mon,
            this.colledtedDay.Tue,
            this.colledtedDay.Wed,
            this.colledtedDay.Thu,
            this.colledtedDay.Fri,
            this.colledtedDay.Sat,
            ],
          backgroundColor: [
            'rgb(255,0,0,0.2)',
            'rgb(255,165,0,0.2)',
            'rgb(255,255,0,0.2)',
            'rgb(0,128,0,0.2)',
            'rgb(0,0,255,0.2)',
            'rgb(75,0,130,0.2)',
            'rgb(238,130,238,0.2)'
          ],
          borderColor: [
            'rgb(255,0,0,1)',
            'rgb(255,165,0,1)',
            'rgb(255,255,0,1)',
            'rgb(0,128,0,1)',
            'rgb(0,0,255,1)',
            'rgb(75,0,130,1)',
            'rgb(238,130,238,1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          legend: {
              display: false,
          }
      },
        scales: {
          y: {
            beginAtZero: true
        }
        }
      }
    });
  }

  

  getUserActivity(){
    let jwtToken = this._authService.getToken();
    const headers = { 'Authorization':  jwtToken };
    this.http.get("http://127.0.0.1:3000/api/v1/user_actions?user_id=" + this._authService.getUserId(),{headers}).subscribe((res:any)=>{
      console.log(res.data);
      this.countData(res.data);
    });
  }

  countData(data: any){
    console.log(data.length);
 // console.log(this.chartDaily);
  this.chartDaily = data
 for(let i = 0; i < this.chartDaily.length; i++){
  this.updatePoints.push(this.chartDaily[i].created_at);
}

//convert string date into ISO date format
console.log(this.updatePoints);
for(let i = 0; i < this.updatePoints.length; i++){
  this.convertedDate.push(new Date(this.updatePoints[i]));
}

//get day
for(let i = 0; i < this.convertedDate.length; i++){
  this.convertedDay.push(days[this.convertedDate[i].getDay()]);
}
console.log(this.convertedDay)

//collect days from array
for(let i = 0; i < this.convertedDay.length; i++){
  // console.log(this.convertedDate);
  if(this.convertedDay[i] === 'Sun'){
    this.daySunday.push(this.chartDaily[i]);
    this.colledtedDay.Sun+=1;
  }
  if(this.convertedDay[i] === 'Mon'){
    this.chartDaily[i]['created_at'] = this.convertedDate[i]
    this.dayMonday.push(this.chartDaily[i]);
    this.colledtedDay.Mon+=1;
  }
  if(this.convertedDay[i] === 'Tue'){
    this.dayTuesday.push(this.chartDaily[i]);
    this.colledtedDay.Tue+=1;
  }
  if(this.convertedDay[i] === 'Wed'){
    this.dayWednesday.push(this.chartDaily[i]);
    this.colledtedDay.Wed+=1;
  }
  if(this.convertedDay[i] === 'Thu'){
    this.dayThursday.push(this.chartDaily[i]);
    this.colledtedDay.Thu+=1;
  }
  if(this.convertedDay[i] === 'Fri'){
    this.dayFriday.push(this.chartDaily[i]);
    this.colledtedDay.Fri+=1;
  }
  if(this.convertedDay[i] === 'Sat'){
    this.daySaturday.push(this.chartDaily[i]);
    this.colledtedDay.Sat+=1;
  }
}
  this.barChartMethod();
  }
}