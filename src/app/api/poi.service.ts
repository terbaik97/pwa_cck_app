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
      
      return this.http.get(this.baseUrl + 'pois/show/'+name);
    }
    //get data history of one place
    getPoiVersion(data: any) {
      
      return this.http.get(this.baseUrl + 'pois/show_version/'+data);
    }
    
    getCategories(){
      return this.http.get(this.baseUrl + 'category');
    }

    saveData (data: any){
      
      let jwtToken = this._authService.getToken();
      const headers = { 'Authorization':  jwtToken };
      
        return this.http.post(this.baseUrl + "pois" ,
          {
            name: data[0]["name"],
            category:data[0]["category"], 
            poi_latitude:data[0]["poi_latitude"],
            poi_longitude:data[0]["poi_longitude"],
            fields: data[1]["details"],
            event:data[0]["event"],
            event_date:data[0]["event_date"] 
          },
          { 
            headers 
          } ).pipe(map(res => { 
              return res; 
            }));
    }

    getPoibyCoordinate(data: any) {
     
      return this.http.get(this.baseUrl + "pois/show" + "?poi_latitude=" + data.lat + "&" + "poi_longitude=" + data.lng);
    }

    updateData (data: any){
      let jwtToken = this._authService.getToken();
      const headers = { 'Authorization':  jwtToken , 'Content-Type': 'application/json'};
      
        return this.http.put(this.baseUrl + "pois/update" ,
          {
           
            name: data[0]["name"],
            category:data[0]["category"], 
            poi_latitude:data[0]["poi_latitude"],
            poi_longitude:data[0]["poi_longitude"],
            fields: data[1]["details"],
            event:data[0]["event"],
            event_date:data[0]["event_date"],
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

    getEventPoi() {
      return this.http.get(this.baseUrl + '/pois/event_poi');
    }


    report_item_poi_version(id: any,whodunnit: any,poi_id: any){
     
      let jwtToken = this._authService.getToken();
      const headers = { 'Authorization':  jwtToken };
      return this.http.post(this.baseUrl + 'pois/show/poi-item-report',{
          poi_id: poi_id,
          id: id,
          whodunnit: whodunnit, 
      },
      { 
        headers 
      }).pipe((res:any)=>{
        console.log(res.data);
        return res; 
      });
    }

    revert_item_poi_version(id: any,whodunnit: any,poi_id: any){
      
      let jwtToken = this._authService.getToken();
      const headers = { 'Authorization':  jwtToken };
      return this.http.post(this.baseUrl + 'pois/show/poi-item-revert',{
        poi_id: poi_id,
        whodunnit: whodunnit, 
        id: id,
      },
      { 
        headers 
      }).pipe((res:any)=>{
        console.log(res);
        return res; 
      });
    }

    updateUserPoint(point: any){
    console.log(point);
    const formData = new FormData();
    formData.append('id', this._authService.getUserId());
    formData.append('user_point',point);
    let jwtToken = this._authService.getToken();
    const headers = { 'Authorization':  jwtToken };
    this.http.put<any>("http://127.0.0.1:3000/api/v1/update", formData ,{ headers})
    }

    revertReport(id: any,whodunnit: any,poi_id: any){
      let jwtToken = this._authService.getToken();
      const headers = { 'Authorization':  jwtToken };
      return this.http.post(this.baseUrl + 'pois/show/poi-item-report-revert-1',{
        poi_id: poi_id,
        whodunnit: whodunnit, 
        id: id,
      },
      { 
        headers 
      }).pipe((res:any)=>{
        console.log(res);
        return res; 
      });
    }
      
}
