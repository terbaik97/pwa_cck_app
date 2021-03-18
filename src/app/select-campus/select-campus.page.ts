import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-campus',
  templateUrl: './select-campus.page.html',
  styleUrls: ['./select-campus.page.scss'],
})
export class SelectCampusPage implements OnInit {
  UniData: any = [];
  noResult=false;

  constructor(private route: Router) {
    this.initializeUniData();
   }

  ngOnInit() {};

  FilterUniData(data:any){
    this.initializeUniData();
    const val = data.target.value;
    if(val && val.trim() !== ''){
      this.UniData = this.UniData.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase())>-1);
      })
      // console.log(this.UniData.length);
      if (this.UniData.length===0){
        this.noResult = true;
        // console.log(this.noResult);
      }
      if (this.UniData.length!==0){
        this.noResult = false;
        // console.log(this.noResult);
      }
      if(data.target.value.length ===1 ){
        this.noResult = false;
      }

    }

  }

  initializeUniData(){
    this.UniData = [
      {
        "name": "UM",
        "code": "01"
      },
      {
        "name": "UITM",
        "code": "02"
      }
    ];
  }

  nextpage() {
    this.route.navigate(['/']);
  }
}
