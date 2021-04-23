import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  profile_data: any;
  nickname: any;
  buttonLogout = true;
  constructor(
    private _api : ApiService, 
    private _auth: AuthService, 
    private route: ActivatedRoute,
    private _profileService: ProfileService,
    private router: Router, 
    
  ) {
    this.nickname = this._auth.getUserNickname();
  }
  ngOnInit() {
    console.log(this._auth.getUserNickname());
    this._profileService.getProfile(this._auth.getUserEmail()).subscribe((res: any) =>{
      console.log(res);
      this.profile_data = res.data;
  })
  }

  logout(){
    // logout and reset the jwt token
    localStorage.removeItem('jwt');
    localStorage.removeItem('nickname');
    localStorage.removeItem('email');
    this.router.navigate(['/']) 
  }
}
