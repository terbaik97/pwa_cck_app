import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import {  NgModule } from "@angular/core"
import { ActivatedRoute, Router } from '@angular/router';
import { PoiService } from '../api/poi.service';
import {HttpClient, HttpEvent, HttpErrorResponse, HttpEventType, HttpRequest, HttpResponse} from '@angular/common/http';
import { AuthService } from "../services/auth.service";
import { AlertController } from '@ionic/angular';
import { AlertMessageService } from '../services/alert-message.service';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  
  //declaration of variables
  public categoryData: any;
  public submitAttempt: boolean = false;
  private playerCount: number = 1;
  public poiInfo: any;
  public poi: any;
  public poiData: any[];
  public index: any;
  message ="";
  data: any;
  updatedata: any;
  adddata: any;
  poi_id: any;
  image_file: File;
  private imageSrc: string = '';
  //Form Group
  requiredInfo: FormGroup;
  additionalInfo: FormGroup;
  uploadForm: FormGroup; 
  keyValueForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder, 
    private _poiService: PoiService, 
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient,
    private _authService:AuthService,
    private alertMessage:AlertMessageService 
  ) 
{

  this.activatedRoute.queryParams.subscribe(params => {
    if (this.router.getCurrentNavigation().extras.state) {
      this.index = this.router.getCurrentNavigation().extras.state.index;
      console.log(this.index)
    }
  })

  this.requiredInfo = formBuilder.group({
    name: ['', Validators.required],
    category: [''],
    poi_latitude:[''],
    poi_longitude:[''],
    image_poi:[''],
    event:[''],
    event_date:['']
    });

  this.additionalInfo = formBuilder.group(
    {
    field: ['', Validators.required],
    }
  );

  //form key and value for fields
  const items = [];
  items.push(this.formBuilder.group({
    key: new FormControl('',Validators.required),
    value: new FormControl('',Validators.required)
  }));
  
  this.keyValueForm = this.formBuilder.group({
    details: this.formBuilder.array(items)
  });
}

  ngOnInit() {
    this._poiService.getCategories().subscribe((data: any) => {
    if (data === ""){
      this.categoryData = [];
    }
      this.categoryData = data;
    });
    this._poiService.getPoibyCoordinate(this.index).subscribe((res: any) => 
    {
      console.log(res)
        if (res){
          this.updatedata = true;
          this.data = res;
          console.log(this.data)
          this.poi_id = this.data.id
          this.requiredInfo.patchValue({
            name: this.data.name,
            poi_latitude:  this.index.lat,
            poi_longitude:  this.index.lng,
            image_poi: "",
            event:this.data.event,
            event_date:this.data.event_date
            });
          }
        
        },
        (err: any) =>{
          console.log(err.error) 
          this.adddata = true;
          this.requiredInfo.patchValue({
            name: "",
            poi_latitude:  this.index.lat,
            poi_longitude:  this.index.lng,
            image_poi: ""
          });
        });

        this.uploadForm = this.formBuilder.group({
          profile: ['']
        });
  }

  addRow() {
    const details = this.keyValueForm.get('details') as FormArray;
    details.push(this.createItem());
  }

  removeRow(index) {
    const details = this.keyValueForm.get('details') as FormArray;
    details.removeAt(index);
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      key: [],
      value: []
    });
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('profile').setValue(file);
    }
  }

  onSubmit(poi_id: any) {
    //update data
    this.poiData = [].concat(this.requiredInfo.value,this.keyValueForm.value,poi_id);
    console.log(this.poiData);
    this._poiService.updateData(this.poiData)
    .subscribe((res: any) => { 
      if(res){ 
        
        this.alertMessage.presentAlert(res.message)
        this.router.navigate(['/']) 
      } 
    }, 
    err => { 
      console.log(err) 
      this.message = err
    });

    //update image
    const formData = new FormData();
    formData.append('image', this.uploadForm.get('profile').value);
    formData.append('poi_id', this.poi_id);
    let jwtToken = this._authService.getToken();
    const headers = { 'Authorization':  jwtToken };
    this.httpClient.put<any>("http://127.0.0.1:3000/api/v1/image_poi/" + this.poi_id, formData ,{ headers}).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }
  isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return true;
}
  
 
  addControl(){
    this.playerCount++;
    this.additionalInfo.addControl('field' + this.playerCount, new FormControl('', Validators.required));
  }
  removeControl(control){
    this.additionalInfo.removeControl(control.key);
  }

  setImageFile(event) {
    this.image_file = event.target.files[0];
    console.log(this.image_file.name)
    if(this.image_file) {
      const file_reader = new FileReader();
      file_reader.readAsDataURL(this.image_file);
    }
  }
  
  handleInputChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e) {
    let reader = e.target;
    this.imageSrc = reader.result;
    console.log(this.imageSrc)
  }

  save(){
    this.submitAttempt = true;
    if(!this.requiredInfo.valid){
    alert("Name required")
    } 
    else {
      
      this.poiData = [].concat(this.requiredInfo.value,this.keyValueForm.value);
      if(this.data === "")
      {
        console.log(this.poiData);
      }
      else
      {
        console.log("this.poiData");
      }
      this._poiService.saveData(this.poiData)
      .subscribe((res: any) => { 
        if(res){ 
          this.alertMessage.presentAlert(res.message)
          this.router.navigate(['']) 
        } 
      }, 
      err => { 
        console.log(err) 
        this.message = err
        this.alertMessage.presentAlert(this.message )
      });
    }
  }

 

}

