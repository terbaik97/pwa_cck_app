import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../app/services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  buttonLogout: any;
  buttonLogin: any;
  constructor(private _authService: AuthService ,  private route: Router,) {
        let checkIslogin= this._authService.getToken();
        if (checkIslogin !== null){
          this.buttonLogout = true
          this.buttonLogin = false
        }
        else{
          console.log("fl")
          this.buttonLogout = false
          this.buttonLogin = true
        }
  }
  logout(){
    // logout and reset the jwt token
    localStorage.removeItem('jwt');
  }
  login(){
    // route to login page
    this.route.navigate(['/login']);
  }

}
