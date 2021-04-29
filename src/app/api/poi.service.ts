import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators'; 
import { AuthService } from '../services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class PoiService {

    baseUrl = 'http://127.0.0.1:3000/api/v1/';
    constructor(public http: HttpClient , private _authService: AuthService) {
    }

    // getting data from index
    getAllPoi() {
        return this.http.get(this.baseUrl + '/pois');
    }
    // get data information of one place
    getPoi(name: string) {
      console.log(name);
      return this.http.get(this.baseUrl + 'pois/show/'+name);
    }
    //get data history of one place
    getPoiVersion(data: any) {
      console.log(data);
      return this.http.get(this.baseUrl + 'pois/show_version/'+data);
    }
    
    getCategories(){
      return this.http.get(this.baseUrl + 'category');
    }

    saveData (data: any){
      console.log("save");
    
      console.log(data);
      let jwtToken = this._authService.getToken();
      const headers = { 'Authorization':  jwtToken };
      console.log(jwtToken);
        return this.http.post(this.baseUrl + "pois" ,
          {
            name: data[0]["name"],
            category:data[0]["category"], 
            poi_latitude:data[0]["poi_latitude"],
            poi_longitude:data[0]["poi_longitude"],
            fields: data[1]["details"], 
          },
          { 
            headers 
          } ).pipe(map(res => { 
              return res; 
            }));
    }

    getPoibyCoordinate(data: any) {
      console.log(data)
      return this.http.get(this.baseUrl + "pois/show" + "?poi_latitude=" + data.lat + "&" + "poi_longitude=" + data.lng);
    }

    updateData (data: any){
      let jwtToken = this._authService.getToken();
      const headers = { 'Authorization':  jwtToken , 'Content-Type': 'application/json'};
      console.log(jwtToken);
        return this.http.put(this.baseUrl + "pois/update" ,
          {
           
            name: data[0]["name"],
            category:data[0]["category"], 
            poi_latitude:data[0]["poi_latitude"],
            poi_longitude:data[0]["poi_longitude"],
            fields: data[1]['details'], 
            poi_id:data[2],
          },
          { 
            headers 
          }
          ).
          pipe(map(res => { 
            
              return res; 
            }));
      }

      reportPoi(data: any){
        console.log("report_poi");
        console.log(data);
        let jwtToken = this._authService.getToken();
        const headers = { 'Authorization':  jwtToken };
        return this.http.put(this.baseUrl + "report/update" ,
          {
            poi_id: data[1],
            is_report: "1", 
            report_reason: data[0]["report_reason"],
          },
          { 
            headers 
          } ).pipe(map(res => { 
              return res; 
            }));
      }

      showPoibyId(data: any){
        return this.http.get(this.baseUrl + 'pois/show_poi/'+data);
      }

      
}
