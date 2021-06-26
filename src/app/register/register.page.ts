import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertMessageService } from '../services/alert-message.service';
import { AuthService } from '../services/auth.service';
import { FirebaseService } from '../services/firebase.service';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(
    private _registerService:RegisterService,
    private _auth: AuthService, 
    private router: Router,
    private alertMessage:AlertMessageService,
    private _firebase:FirebaseService, ) { }

  ngOnInit() {
  }
 
  register(form: NgForm) {
    this._registerService.userRegister(
      form.value).subscribe(
        (res: any) => {
          this._auth.setDataInLocalStorage('email', res.data.user.email) 
          this._auth.setDataInLocalStorage('nickname', res.data.user.nickname) 
          this._auth.setDataInLocalStorage('jwt', res.data.access_token.jwt)
          this._auth.setDataInLocalStorage('id', res.data.user.id)
          this._auth.setDataInLocalStorage('user_point', res.data.user.user_point)
          this._firebase.create_user_login(res.data,0);
        this.alertMessage.presentAlert("Succesfully login") 
        this.router.navigate(['tabs/tab2']) 
        console.log("success");
      },
      error => {

        this.alertMessage.presentAlert(error.error.message)
        console.log(error);
      }
    );
  }

  login(){
    this.router.navigate(['/login'])
  }
}
