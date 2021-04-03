import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-poi-report',
  templateUrl: './poi-report.page.html',
  styleUrls: ['./poi-report.page.scss'],
})
export class PoiReportPage implements OnInit {
  public reportform: FormGroup;
  constructor(private formbuilder: FormBuilder) { }

  reportForm = this.formbuilder.group({
    poiName: [''],
    reportType: [''],
    comments: ['']
  });

  ngOnInit() {
      //   this.form_one = this.fb.group({
      // // firstName: new FormControl('', Validators.compose([
      // //   Validators.required,
      // //   Validators.pattern('[a-zA-Z ]*'),
      // //   Validators.maxLength(30),
      //   });
  }



  submit(){
    console.log(this.reportForm);
  }
}
