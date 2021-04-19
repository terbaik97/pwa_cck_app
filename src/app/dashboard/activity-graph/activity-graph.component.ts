import {  Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-activity-graph',
  templateUrl: './activity-graph.component.html',
  styleUrls: ['./activity-graph.component.scss'],
})
export class ActivityGraphComponent  implements OnInit{
  public chartItem: any[] = [];
  public chartWeekData: any;
  @ViewChild('barCanvas') private barCanvas: ElementRef;

  barChart: any;

  constructor(private route: Router) { }

  ngOnInit() {
    this.refresh();
    //Store first POI Data
    if (this.chartItem == null) {
      localStorage.setItem("addChartData", JSON.stringify([{
        "chartID": '', "Sun": '', "Mon": '', "Tue": '', "Wed": '', "Thu": '', "Fri": '', "Sat": '' }]))
      this.refresh();
    }

    this.chartWeekData = this.chartItem[1];
    console.log(this.chartWeekData.Sun);
  }

  refresh() {
    this.chartItem = JSON.parse(localStorage.getItem("addChartData"));
  }

  ngAfterViewInit() {
    this.barChartMethod();
    // this.addData();
  }

  barChartMethod() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
        datasets: [{
          data: [
            this.chartWeekData.Sun,
            this.chartWeekData.Mon,
            this.chartWeekData.Tue,
            this.chartWeekData.Wed,
            this.chartWeekData.Thu,
            this.chartWeekData.Fri,
            this.chartWeekData.Sat],
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

  toPageBadges(){
    this.route.navigate(['/badges']);
  }

  addData(){
    if (this.chartItem !== null && this.chartItem.length>0){
      this.chartItem.push(
        {
          chartID: 1,
          Sun: 8,
          Mon: 3,
          Tue: 2,
          Wed: 1,
          Thu: 4,
          Fri: 4,
          Sat: 7,
        }
      );
      localStorage.setItem("addChartData", JSON.stringify(this.chartItem));
    }
  }
}
