import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PoiService } from '../api/poi.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  
 
  public categoryData: any;
  public requiredInfo: FormGroup;
  public additionalInfo: FormGroup;
  public submitAttempt: boolean = false;
  private playerCount: number = 1;
  id: string
  latitude: any;
  longitude: any;
  public poiInfo: any;
  public editForm: FormGroup;
  public poi: any;
  public poiData: any[];
  public index: any;
  message ="";
  data: any;
  updatedata: any;
  adddata: any;
  poi_id: any;
  constructor(private formBuilder: FormBuilder, private _poiService: PoiService, private activatedRoute: ActivatedRoute,
    private router: Router,) {
    
    
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.index = this.router.getCurrentNavigation().extras.state.index;
        // this.poiData = JSON.parse(localStorage.getItem("addpoiData"));
        // this.poi =[ this.poiData[this.index]];
      }
    })

    this.requiredInfo = formBuilder.group({
      name: ['', Validators.required],
      category: [''],
      poi_latitude:[''],
      poi_longitude:['']
     
      });


    this.additionalInfo = formBuilder.group(
     
      {
      field: ['', Validators.required],
      
      }
    );

    
   }

  

  ngOnInit() {
     this._poiService.getCategories().subscribe((data: any) => {
      
      if (data === ""){
        this.categoryData = [];
      }
      this.categoryData = data;
      });
     
      this._poiService.getPoibyCoordinate(this.index).subscribe((res: any) => {
          
          console.log(res)
          if (res){
            this.updatedata = true;
            this.data = res;
            console.log(this.data)
            this.poi_id = this.data.id
            this.requiredInfo.patchValue({
              name: this.data.name,
              poi_latitude:  this.data.poi_latitude,
              poi_longitude:  this.data.poi_longitude
            });
          }
        
        },(err: any) =>{
          console.log(err.error) 
          this.adddata = true;
          this.requiredInfo.patchValue({
            name: "",
            poi_latitude:  this.poi[0].latitude,
            poi_longitude:  this.poi[0].longitude
          });
        }
        );

  }
  
 

 
  addControl(){
    this.playerCount++;
    this.additionalInfo.addControl('field' + this.playerCount, new FormControl('', Validators.required));
  }
  removeControl(control){
    this.additionalInfo.removeControl(control.key);
  }


  
  save(){
        
        this.submitAttempt = true;
        if(!this.requiredInfo.valid){
         alert("Name required")
        } 
        else {
         
          // let coordinate = [this.poi.latitude,this.poi.longitude]
          this.poiData = [].concat(this.requiredInfo.value,this.additionalInfo.value);
          console.log(this.data);
          if(this.data === ""){
            console.log(this.poiData);
          }
          else{
            console.log("this.poiData");
          }
           this._poiService.saveData(this.poiData).subscribe((res: any) => { 
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

  update(poi_id: any){
    console.log(poi_id);
    this.poiData = [].concat(this.requiredInfo.value,this.additionalInfo.value,poi_id);
    this._poiService.updateData(this.poiData).subscribe((res: any) => { 
      if(res){ 
        console.log(res.message);
        this.message = res.message
        this.router.navigate(['/']) 
      } 
    }, err => { 
      console.log(err) 
      this.message = err
    });
  }
      
}

