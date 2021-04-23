import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
profile_data: any;
buttonLogout = true;
buttonLogin: any;
  constructor( 
    private _api : ApiService, 
    private _auth: AuthService, 
    private route: ActivatedRoute,
    private _profileService: ProfileService) {
      
        
     }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      console.log(params.get('email') + "profile")
       this._profileService.getProfile(params.get('email')).subscribe((res: any) =>{
          console.log(res);
          this.profile_data = res.data;
      })   
      });
  }
  logout(){
    // logout and reset the jwt token
    localStorage.removeItem('jwt');
    localStorage.removeItem('nickname');
    localStorage.removeItem('email');
  }
}
