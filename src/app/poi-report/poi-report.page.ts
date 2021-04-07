import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-poi-report',
  templateUrl: './poi-report.page.html',
  styleUrls: ['./poi-report.page.scss'],
})
export class PoiReportPage implements OnInit {
  public reportForm: FormGroup;
  public poiData: any[];
  public submitAttempt: boolean = false;
  constructor(private formbuilder: FormBuilder) {
    this.reportForm = formbuilder.group({
      placeName: ['',Validators.required],
      reportType: ['',Validators.required],
      comments: ['']
    });
   }

 

  ngOnInit() {
     
  }



  save(){
    this.submitAttempt = true;

        if(!this.reportForm.valid){
         alert("Name required")
        } 
      
        else {
          console.log("success!")
          // console.log(this.requiredInfo.value);
          // console.log(this.additionalInfo.value);
          this.poiData =[].concat(this.reportForm.value);
          console.log(this.poiData);
        }
  }
}
