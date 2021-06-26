import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { ProfileService } from '../services/profile.service';
import { ajax, css } from "jquery";
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { AlertMessageService } from '../services/alert-message.service';
import { FirebaseService } from '../services/firebase.service';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  profile_data: any;
  nickname: any;
  buttonLogout = true;
  updateProfile: FormGroup; 
  displayImage: any;
  errMessage = "";
  constructor(
    private _api : ApiService, 
    private _auth: AuthService, 
    private route: ActivatedRoute,
    private _profileService: ProfileService,
    private router: Router, 
    private formBuilder: FormBuilder, 
    private _authService: AuthService,
    private httpClient: HttpClient,
    private sanitizer: DomSanitizer,
    private alertMessage:AlertMessageService,
    private _firebaseService:FirebaseService
    
  ) {
    this.nickname = this._auth.getUserNickname();
    this.updateProfile = formBuilder.group({
      avatar:[''],
      full_name: ['', Validators.required],
      email:['', Validators.required],
      mobile_number:['',Validators.required],
      });
    
  }
  ngOnInit() {
      console.log(this._auth.getUserNickname());
      this._firebaseService.update_user({totalPoints: parseInt(this._authService.getUserPoint()) },this._authService.getUserId())
      this._profileService.getProfile(this._auth.getUserEmail()).subscribe((res: any) =>{
        console.log(res.data[0]);
        this.profile_data = res.data[0];
        this.displayImage = "http://127.0.0.1:3000"+res.data[0]["avatar"]["url"];
        this.updateProfile.patchValue({
          full_name: this.profile_data.full_name,
          email:this.profile_data.email,
          mobile_number:this.profile_data.mobile_number,
        });
       
  })
  }


  onFileSelect(event) {
    
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      
      this.updateProfile.get('avatar').setValue(file);
      console.log(URL.createObjectURL(file))
      this.displayImage = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(file));
      var readURL = function(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('.profile-pic').attr('src', URL.createObjectURL(file));
            }
    
            reader.readAsDataURL(input.files[0])
        }
    }

    $(".file-upload").on('change', function(){
      readURL(this);
    });
   

  }}

  onSubmit() {
   
console.log("update")
    //update image
    const formData = new FormData();
    formData.append('id', this._authService.getUserId());
    formData.append('avatar', this.updateProfile.get('avatar').value);
    formData.append('full_name', this.updateProfile.get('full_name').value);
    formData.append('email', this.updateProfile.get('email').value);
    formData.append('mobile_number', this.updateProfile.get('mobile_number').value);
    formData.append('user_point', this._authService.getUserPoint());
    let jwtToken = this._authService.getToken();
    const headers = { 'Authorization':  jwtToken };
   
    this.httpClient.put<any>("http://127.0.0.1:3000/api/v1/update", formData ,{ headers}).subscribe(
      (res:any) => {
      console.log(res)
      // update in angular
      this._firebaseService.update_user(res.data,res.data.id)
      this.alertMessage.presentAlert(res.message)
      this.router.navigate(['/tabs/tab2'])
      } ,
      (err: any) => 
      {
        console.log(err)
        this.errMessage=err.message
        if(this.errMessage == "Invalid Credentials"){
          this.logout();
        }
      }
     
    );
  }

  logout(){
    const formData = new FormData();
    formData.append('id', this._authService.getUserId());
    formData.append('user_point', this._authService.getUserPoint());
    let jwtToken = this._authService.getToken();
    const headers = { 'Authorization':  jwtToken };
    this.httpClient.put<any>("http://127.0.0.1:3000/api/v1/update", formData ,{ headers}).subscribe((data:any)=>{
      console.log(data)
      localStorage.clear();
      this.router.navigate(['/'])
      .then(() => {
        window.location.reload();
      }); 
    })
  }


}

