import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-poi-report',
  templateUrl: './poi-report.page.html',
  styleUrls: ['./poi-report.page.scss'],
})
export class PoiReportPage implements OnInit {

  constructor(private fb: FormBuilder) { }

  reportForm = this.fb.group({
    poiName: [''],
    reportType: [''],
    comments: ['']
  });

  ngOnInit() {
  }

  submit(){
    console.log(this.reportForm);
  }
}
