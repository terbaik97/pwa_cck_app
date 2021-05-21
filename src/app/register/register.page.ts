import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertMessageService } from '../services/alert-message.service';
import { AuthService } from '../services/auth.service';
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
    private alertMessage:AlertMessageService ) { }

  ngOnInit() {
  }
 
  register(form: NgForm) {
    this._registerService.userRegister(
      form.value).subscribe(
        (res: any) => {
        this._auth.setDataInLocalStorage('email', res.data.user.email) 
        this._auth.setDataInLocalStorage('jwt', res.data.access_token.jwt)
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
