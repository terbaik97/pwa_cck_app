import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor( 
    private _api : ApiService, 
    private _auth: AuthService, ) { }

  ngOnInit() {
    this.test_jwt() 
  }
  test_jwt(){ 
    this._api.getTypeRequest('test-jwt').subscribe((res: any) => { 
      console.log(res) 
 
    }, err => { 
      console.log(err) 
    }); 
  } 
}
