import { ngfModule, ngf } from "angular-file"
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators   } from '@angular/forms';
import {  NgModule } from "@angular/core"
import { ActivatedRoute, Router } from '@angular/router';
import { PoiService } from '../api/poi.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {HttpClient, HttpEvent, HttpErrorResponse, HttpEventType, HttpRequest, HttpResponse} from '@angular/common/http';
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic"
import { BrowserModule } from '@angular/platform-browser'
import { Subscription } from 'rxjs'
import { AuthService } from "../services/auth.service";
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
  image_file: File;
  private imageSrc: string = '';
  SERVER_URL: string = "http://127.0.0.1:3000/api/v1/";
  postUrl = '...'
  myFormData:FormData//populated by ngfFormData directive
  httpEvent:HttpEvent<{}>
  accept = '*'
  files:File[] = []
  progress:number
  uploadForm: FormGroup; 
  //url = 'https://evening-anchorage-3159.herokuapp.com/api/'
  url = 'https://jquery-file-upload.appspot.com/'
  hasBaseDropZoneOver:boolean = false
  httpEmitter:Subscription
  
  lastFileAt:Date

  sendableFormData:FormData//populated via ngfFormData directive

  dragFiles:any
  validComboDrag:any
  lastInvalids:any
  fileDropDisabled:any
  maxSize:any
  baseDropValid:any
  constructor(private formBuilder: FormBuilder, private _poiService: PoiService, private activatedRoute: ActivatedRoute,
    private router: Router,private camera: Camera,private httpClient: HttpClient,private _authService:AuthService) {
    
    
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
      image_poi:['']
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
              poi_latitude:  this.index.lat,
              poi_longitude:  this.index.lng,
              image_poi: ""
            });
          }
        
        },(err: any) =>{
          console.log(err.error) 
          this.adddata = true;
          this.requiredInfo.patchValue({
            name: "",
            poi_latitude:  this.index.lat,
            poi_longitude:  this.index.lng,
            image_poi: ""
          });
        }
        );

        this.uploadForm = this.formBuilder.group({
          profile: ['']
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
    console.log(poi_id);
    this.poiData = [].concat(this.requiredInfo.value,this.additionalInfo.value,poi_id);
    this._poiService.updateData(this.poiData)
    .subscribe((res: any) => { 
      if(res){ 
        console.log(res.message);
        this.message = res.message
        this.router.navigate(['/']) 
      } 
    }, err => { 
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

  public upload(formData) {
        return this.httpClient.post<any>(this.SERVER_URL, formData, {
          reportProgress: true,
          observe: 'events'
        });
    
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
           this._poiService.saveData(this.poiData)
           .subscribe((res: any) => { 
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

  // update(poi_id: any){
  //   console.log(poi_id);
  //   this.poiData = [].concat(this.requiredInfo.value,this.additionalInfo.value,poi_id,this.image_file,this.imageSrc);
  //   this._poiService.updateData(this.poiData)
  //   .subscribe((res: any) => { 
  //     if(res){ 
  //       console.log(res.message);
  //       this.message = res.message
  //       this.router.navigate(['/']) 
  //     } 
  //   }, err => { 
  //     console.log(err) 
  //     this.message = err
  //   });
  // }
      
}

