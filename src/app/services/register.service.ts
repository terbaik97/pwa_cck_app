import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators'; 
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  baseUrl = 'http://127.0.0.1:3000/api/v1/';
  data: any;
  constructor(private httpClient: HttpClient) { }

  userRegister(data: any){
    console.log(data);
    return this.httpClient.post(this.baseUrl + "sign-up" ,
    {
      nickname: data.nickname,
      full_name: data.full_name,
      email: data.email,
      mobile_number: data.mobile_number,
      nationality: data.nationality,
      password: data.password,
      password_confirm: data.password_confirm
    }).pipe(map(res => { 
        return res; 
      }));
  }
}
