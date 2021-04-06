import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
export class POIData {
  // category: string;
  // poiName: string;
  poiID: string;
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  public editForm: FormGroup;
  public poi: POIData;
  public poiData: any[];
  public index: any;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    ) {
      this.activatedRoute.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state) {
          this.index = this.router.getCurrentNavigation().extras.state.index;
          this.poiData = JSON.parse(localStorage.getItem("addpoiData"));
          this.poi = this.poiData[this.index];
        }
      })
  }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      poiID: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(30),
      ])),
    });

    this.bindData();
  }

  bindData() {

    this.editForm = this.formBuilder.group({
      poiID: [this.poi?.poiID],
    });
  }

  submit(value: any) {

    let poi = value;
    this.poiData[this.index] = poi;
    localStorage.setItem("addpoiData", JSON.stringify(this.poiData));
    // this.router.navigate(['./home'], { replaceUrl: true });
  }
}
