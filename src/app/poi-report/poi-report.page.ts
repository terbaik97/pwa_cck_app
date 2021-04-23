import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PoiService } from '../api/poi.service';
@Component({
  selector: 'app-poi-report',
  templateUrl: './poi-report.page.html',
  styleUrls: ['./poi-report.page.scss'],
})
export class PoiReportPage implements OnInit {
  public reportForm: FormGroup;
  public poi= [];
  public poiData: any[];
  public index: any;
  public poiInfo = [];
  public submitAttempt: boolean = false;
  data: any;
  message ="";
  id = "";
  constructor(private formbuilder: FormBuilder, private activatedRoute: ActivatedRoute,private router: Router,private _poiService: PoiService,private route: ActivatedRoute) {
    this.reportForm = formbuilder.group({
      name: ['',Validators.required],
      report_reason: ['',Validators.required],
      comments: ['']
    });

    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.index = this.router.getCurrentNavigation().extras.state.index;
        this.poiData = JSON.parse(localStorage.getItem("addpoiData"));
        this.poi = this.poiData[this.index];
      }
    })
   }

 

  ngOnInit() {
    const id: string = this.route.snapshot.params.id;
    console.log(id);
    this._poiService.showPoibyId(id).subscribe((res: any) => {
    this.data = res;
    console.log(this.data);
    this.id=this.data.id
    this.reportForm.patchValue({
      name: this.data.name,
    });
    });
  }



  report(id: any){
    this.submitAttempt = true;

        if(!this.reportForm.valid){
         alert("Name required")
        } 
      
        else {
          console.log("report" + id)
          this.poiData =[].concat(this.reportForm.value,id);
          console.log(this.poiData);
          this._poiService.reportPoi(this.poiData).subscribe((res: any) => { 
            if(res){ 
              console.log(res.message);
              this.message = res.message
              this.router.navigate(['']) 
            } 
          }, err => { 
            console.log(err) 
            this.message = err
          });
        }
  }
}
