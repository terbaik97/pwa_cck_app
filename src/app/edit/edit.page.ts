import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  public poiData: any[];
  public storeData: any[] = [];
  public formOneValue: any;
  constructor(private fb: FormBuilder) { }

  reportForm = this.fb.group({
    poiName: [''],
    reportType: [''],
    comments: ['']
  });

  ngOnInit() {
    this.bindData();
  }

  submit(value: any){
    console.log(this.reportForm);
    this.formOneValue = value;
    // let local = localStorage.setItem("POI-data", JSON.stringify(this.poiData));
    let employee = Object.assign(this.formOneValue, value);
    console.log(employee);
    this.storeData.push(employee);
    let local = localStorage.setItem("poiData", JSON.stringify(this.storeData));
    console.log(local);
  }

  bindData() {
    // this.reportForm = this.fb.group({
    //   poiName: [this.employee?.firstName],
    //   reportType: [this.employee?.lastName],
    //   comments: [this.employee?.gender],
    // });
  }
}
