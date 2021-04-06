import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { isNull } from '@angular/compiler/src/output/output_ast';
@Injectable({
  providedIn: 'root'
})
export class PoiService {

    baseUrl = 'http://127.0.0.1:3000/api/v1/';
    data: any;
    constructor(public http: HttpClient) {
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


   
}
