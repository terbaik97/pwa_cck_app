import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PoiService } from '../api/poi.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  public poiData: any[];
 
  public categoryData: any;


  public requiredInfo: FormGroup;
  public additionalInfo: FormGroup;
  public submitAttempt: boolean = false;
  private playerCount: number = 1;
  id: string
  latitude: any;
  longitude: any;
  public poiInfo: any;
  constructor(private formBuilder: FormBuilder, private _poiService: PoiService, private activatedRoute: ActivatedRoute) {

    this.requiredInfo = formBuilder.group({
      placeName: ['', Validators.required],
      categoryName: [''],
      // latitude: [],
      // longitude: []
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
    
      
      this.poiInfo = this.activatedRoute.snapshot.paramMap.get("name")
      // console.log(this.poiInfo.split(",")[1])
      this.latitude = this.poiInfo.split(",")[1]
      this.longitude = this.poiInfo.split(",")[2]
      console.log(this.latitude);
      console.log(this.longitude);
    

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

