import { Component, OnInit } from '@angular/core';
import { Leaderboard } from './leaderboard.model';
import { ProfileService } from 'src/app/services/profile.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.page.html',
  styleUrls: ['./leaderboard.page.scss'],
})
export class LeaderboardPage implements OnInit {

  //dummy data
  public players =[
        //  {
        //     "rank": "1",
        //     "name": "Luqman",
        //     "fuck": "100"
        // },
        // {
        //   "rank": "2",
        //   "name": "Hakim",
        //   "fuck": "50"
        // },
      ]

  tableStyle = 'bootstrap';
  users = [];
  constructor(
    _profileService:ProfileService,
    private firestore: AngularFirestore
  ) { }

  ngOnInit() {
    this.firestore
    .collection("users-profile", ref => ref.orderBy('totalPoints','desc'))
    .get().subscribe((data:any)=>{
      data.docs.forEach(element => {
        console.log(element.data());
        this.players.push(element.data());
        console.log(this.players);
      }
      );
    })

    
  
  }


}
