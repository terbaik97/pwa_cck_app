import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';
import { AlertMessageService } from '../services/alert-message.service';
import { FirebaseService } from '../services/firebase.service';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form: FormGroup 
  email: any;
  errorMessage: any;
  constructor( 
    private _api : ApiService, 
    private _auth: AuthService, 
    private router: Router, 
    public fb: FormBuilder,
    public alertMessage: AlertMessageService,
    private _firebase:FirebaseService,
    private _profileService:ProfileService
  ) { } 
 
  ngOnInit(): void { 
    this.form = this.fb.group({ 
      email: ['', Validators.required], 
      password:['', Validators.required] 
    }); 
    
  } 


  login(){ 
    let b = this.form.value 
    this._api.postTypeRequest('login', b).subscribe((res: any) => { 
      console.log(res.data.user.user_point) 
      this.email = res.data.user.email
      if(res.data.access_token){ 
        this._auth.setDataInLocalStorage('email', res.data.user.email) 
        this._auth.setDataInLocalStorage('nickname', res.data.user.nickname) 
        this._auth.setDataInLocalStorage('jwt', res.data.access_token.jwt)
        this._auth.setDataInLocalStorage('id', res.data.user.id)
        this._auth.setDataInLocalStorage('user_point', res.data.user.user_point)
        // console.log( this._profileService.getProfile(this.email));
        this._profileService.getProfile(this.email).subscribe((data:any)=>{
          console.log(data.data);
          this._firebase.create_user(data.data,0);
          this.alertMessage.presentAlert("Successfully login") 
          this.router.navigate(['tabs/tab2']) 
        })
        
        
      } 
    }, err => { 
      this.errorMessage = err.error.message;
      this.alertMessage.presentAlert("Invalid email or password")
      console.log(err.error.message) 
    }); 
  } 

  register(){
    this.router.navigate(['/register']) 
  }
}
