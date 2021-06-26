import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoiService } from '../api/poi.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  option = {
    slidesPerView: 1.5,
    centeredSlides: true,
    loop:true,
    spaceBetween:10
  };
  data: any;
  //stars
  userInfoStars = [];
  percentStar1 = 0;
  percentStar2 = 0;
  percentStar3 = 0;
  percentStar4 = 0; 
  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private _poiService:PoiService,
    private firestore: AngularFirestore) {


    // this.firestore
    // .collection("users-profile")
    // .get()
    // .subscribe((ss) => {
    //   ss.docs.forEach((doc) => {
    //   this.userInfoStars.push(doc.data());
    //   });
    //  //  console.log(this.userInfoStars);
    //   console.log(this.userInfoStars)
    //   for(let i = 0; i < this.userInfoStars.length; i++){
    //    if(this.userInfoStars[i].id === 'e6c46097-d1fd-4773-8912-c59f6afd2cb5'){
    //      console.log(this.userInfoStars[i].totalPoints);
         
    //      if(this.userInfoStars[i].totalPoints > 1 || this.userInfoStars[i].totalPoints <= 100){
    //        this.percentStar1 = this.userInfoStars[i].totalPoints/2000*100;
    //        if(this.percentStar1 >= 100){
    //          this.percentStar1 = 100;
    //        }
    //      }
    //    }
    //  }
    //   // console.log(this.userTotalUpdate);
      
    // });

   }

  ngOnInit() {
    const id: string = this.route.snapshot.params.id;
    console.log(id);
    this._poiService.getPoiVersion(id).subscribe((res: any)=>{
      this.data = res;
      console.log(this.data);
      console.log(this.data[0]['user']['user_point']);

      for(let i = 0; i < this.data.length; i++){
      this.percentStar1 = this.data[i]['user']['user_point'].totalPoints/2000*100;
      if(this.percentStar1 >= 100){
        this.percentStar1 = 100;
      }
      }
    },
    (err: any) =>{
      console.log(err.error);
    })
  }

  buttonEdit() {
    this.router.navigate(['/edit']);
  }

  buttonReport() {
    this.router.navigate(['/poi-report']);
  }

  buttonInfo(){
    this.router.navigate(['/poi-info']);
  }
}
