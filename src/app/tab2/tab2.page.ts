import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { ProfileService } from '../services/profile.service';
import { ajax, css } from "jquery";
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
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
  constructor(
    private _api : ApiService, 
    private _auth: AuthService, 
    private route: ActivatedRoute,
    private _profileService: ProfileService,
    private router: Router, 
    private formBuilder: FormBuilder, 
    private _authService: AuthService,
    private httpClient: HttpClient,
    private sanitizer: DomSanitizer
    
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
    this._profileService.getProfile(this._auth.getUserEmail()).subscribe((res: any) =>{
      console.log(res.data[0]);
      this.profile_data = res.data[0];
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

  onSubmit(poi_id: any) {
   

    //update image
    const formData = new FormData();
    formData.append('id', this._authService.getUserId());
    formData.append('avatar', this.updateProfile.get('avatar').value);
    formData.append('full_name', this.updateProfile.get('full_name').value);
    formData.append('email', this.updateProfile.get('email').value);
    formData.append('mobile_number', this.updateProfile.get('mobile_number').value);

    let jwtToken = this._authService.getToken();
    const headers = { 'Authorization':  jwtToken };
    this.httpClient.put<any>("http://127.0.0.1:3000/api/v1/update", formData ,{ headers}).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }

  update(){
    const data = this.updateProfile.value
  }

  logout(){
    // logout and reset the jwt token
    localStorage.removeItem('jwt');
    localStorage.removeItem('nickname');
    localStorage.removeItem('email');
    this.router.navigate(['/']) 
  }

  
}

