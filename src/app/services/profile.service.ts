import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators'; 
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  baseUrl = 'http://127.0.0.1:3000/api/v1/';
  data: any;
  constructor(private httpClient: HttpClient ,private _authService:AuthService) {
    
   }

  getProfile(data: any){
    let jwtToken = this._authService.getToken();
    const headers = { 'Authorization':  jwtToken };
    // return this.http.get(this.baseUrl + "show",{email: data},{headers}).subscribe|
    return this.httpClient.get(this.baseUrl + "show" + "?email=" + data,{ headers }).pipe(map(res => { 
      return res; 
    }));

  }

  getUseractivity(){
    let jwtToken = this._authService.getToken();
    const headers = { 'Authorization':  jwtToken };
    console.log(this._authService.getUserId())
    return this.httpClient.get("http://127.0.0.1:3000/api/v1/user_actions?user_id=" + this._authService.getUserId(),{ headers });
  }

  getUseractivityPoi(poi_id:any){
    let jwtToken = this._authService.getToken();
    const headers = { 'Authorization':  jwtToken };
    console.log(this._authService.getUserId())
    return this.httpClient.get("http://127.0.0.1:3000/api/v1/user_actions?user_id=" + this._authService.getUserId() + "poi_id=" + poi_id,{ headers });
  }

  getUseractivityLeaderboard(){
    return this.httpClient.get("http://127.0.0.1:3000/api/v1/user_data");
  }


  getUseractivityReport(){
    let jwtToken = this._authService.getToken();
    const headers = { 'Authorization':  jwtToken };
    console.log(this._authService.getUserId())
    return this.httpClient.get("http://127.0.0.1:3000/api/v1/user_actions_report?user_id=" + this._authService.getUserId() ,{ headers });
  }

  getUseractivityUpdate(){
    let jwtToken = this._authService.getToken();
    const headers = { 'Authorization':  jwtToken };
    console.log(this._authService.getUserId())
    return this.httpClient.get("http://127.0.0.1:3000/api/v1/user_actions_update?user_id=" + this._authService.getUserId() ,{ headers });
  }

  getUseractivityCreate(){
    let jwtToken = this._authService.getToken();
    const headers = { 'Authorization':  jwtToken };
    console.log(this._authService.getUserId())
    return this.httpClient.get("http://127.0.0.1:3000/api/v1/user_actions_create?user_id=" + this._authService.getUserId(),{ headers });
  }

  
}
