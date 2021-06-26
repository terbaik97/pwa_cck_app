import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://127.0.0.1:3000/api/v1/';
  constructor(
    public http: HttpClient
  ) { 
  } 

  getUserDetails() { 
      return localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null; 
  } 
   
  setDataInLocalStorage(variableName, data) { 
      localStorage.setItem(variableName, data); 
  } 

  getToken() { 
      return localStorage.getItem('jwt'); 
  } 
  getUserEmail() { 
    return localStorage.getItem('email'); 
  } 
  getUserNickname() { 
    return localStorage.getItem('nickname'); 
  } 
  getUserId() { 
    return localStorage.getItem('id'); 
  } 

  getUserPoint() { 
    return localStorage.getItem('user_point'); 
  } 

  clearStorage() { 
      localStorage.clear(); 
  } 

  getUserDetail(){
    let jwtToken = this.getToken();
    const headers = { 'Authorization':  jwtToken , 'Content-Type': 'application/json'};
    return this.http.get(this.baseUrl + '/show',{
      headers
    });
  }
}
