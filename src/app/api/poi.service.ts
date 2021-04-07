import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { AuthService } from '../services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class PoiService {

    baseUrl = 'http://127.0.0.1:3000/api/v1/';
    data: any;
    poiData: any;
    
    constructor(public http: HttpClient , private _authService: AuthService) {
    }

    // getting data from index
    getAllPoi(name: string) {
      console.log(name);
      if (name != null){
        return this.http.get(this.baseUrl + 'pois/' + name);
      }
      else{
        return this.http.get(this.baseUrl + '/pois');
      }
     
    }
    // get data information of one place
    getPoi(name: string) {
      console.log(name);
      return this.http.get(this.baseUrl + 'pois/show/'+name);
    }
    //get data history of one place
    getPoiVersion(name: string) {
      console.log(name);
      return this.http.get(this.baseUrl + 'pois/show_version/'+name);
    }
    
    getCategories(){
      return this.http.get(this.baseUrl + 'category');
    }

    saveData (data: any){
    // return "data";
    let jwtToken = this._authService.getToken();
    const headers = { 'Authorization':  jwtToken };
      return this.http.post(this.baseUrl + "pois" ,
       {name: "Kafeteria",
       fields: 
        {
        "rating" : 4.5,
        "website" : "https://www.google.com/imghp?hl=EN",
        "address" : "Baktisiswa, 50603 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur",
        "phone_number" : "(02) 9374 4000"
        },  
        coordinate: "3.1189135014848364, 101.65991838090626"},{ headers }).subscribe({
          next: data => {
              this.poiData = data;
          },
          error: error => {
              console.error('There was an error!', error);
          }
      });
    }
   
}
