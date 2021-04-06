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
  constructor(private formBuilder: FormBuilder, private _poiService: PoiService, private activatedRoute: ActivatedRoute,
    private router: Router,) {
    
    
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.index = this.router.getCurrentNavigation().extras.state.index;
        this.poiData = JSON.parse(localStorage.getItem("addpoiData"));
        this.poi = this.poiData[this.index];
      }
    })

    this.requiredInfo = formBuilder.group({
      placeName: ['', Validators.required],
      categoryName: [''],
     
      });


    this.additionalInfo = formBuilder.group(
     
      {
      player1: ['', Validators.required],
      
      }
    );

    
   }

  

  ngOnInit() {
     this._poiService.getCategories().subscribe(data => {
      this.categoryData = data;
      console.log(this.categoryData);
      console.log(this.categoryData[0]["category_name"]);
      })
    
      console.log("check data")
      console.log(this.poi.latitude);
     
    

  }
  
 

 
  addControl(){
    this.playerCount++;
    this.additionalInfo.addControl('player' + this.playerCount, new FormControl('', Validators.required));
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
          console.log("success!")
          // console.log(this.requiredInfo.value);
          // console.log(this.additionalInfo.value);
          this.poiData =[].concat(this.requiredInfo.value,this.additionalInfo.value);
          console.log(this.poiData);
          let message = this._poiService.saveData(this.poiData);
          console.log(message);
        }
      }

      
}

