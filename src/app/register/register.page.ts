import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
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
    private router: Router, ) { }

  ngOnInit() {
  }
  // Dismiss Register Modal
  dismissRegister() {
    // this.modalController.dismiss();
  }
  // On Login button tap, dismiss Register modal and open login Modal
  async loginModal() {
    // this.dismissRegister();
    // const loginModal = await this.modalController.create({
    //   component: LoginPage,
    // });
    // return await loginModal.present();
  }
  register(form: NgForm) {
    this._registerService.userRegister(
      form.value).subscribe(
        (res: any) => {
        this._auth.setDataInLocalStorage('email', res.data.user.email) 
        this._auth.setDataInLocalStorage('jwt', res.data.access_token.jwt) 
        this.router.navigate(['tabs/tab2']) 
        console.log("success");
      },
      error => {
        console.log(error);
      }
    );
  }
}
