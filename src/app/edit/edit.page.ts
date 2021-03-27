import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

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
