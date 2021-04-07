
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private REST_API_SERVER = "http://127.0.0.1:3000/api/v1/"; 
  constructor(private httpClient: HttpClient) { } 
 
  getTypeRequest(url) { 
    return this.httpClient.get(this.REST_API_SERVER+url).pipe(map(res => { 
      return res; 
    })); 
  } 
 
  postTypeRequest(url, payload) { 
    return this.httpClient.post(this.REST_API_SERVER+url, payload).pipe(map(res => { 
      return res; 
    })); 
  } 
 
  putTypeRequest(url, payload) { 
    return this.httpClient.put(this.REST_API_SERVER+url, payload).pipe(map(res => { 
      return res; 
    })) 
  }   
}
