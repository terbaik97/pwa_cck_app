import { Component, OnInit } from '@angular/core';
import { Leaderboard } from './leaderboard.model';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.page.html',
  styleUrls: ['./leaderboard.page.scss'],
})
export class LeaderboardPage implements OnInit {

  public players =[
        {
            "rank": "1",
            "name": "Luqman",
            "points": "100"
        },
        {
          "rank": "2",
          "name": "Hakim",
          "points": "50"
        },
      ]

  tableStyle = 'bootstrap';

  constructor() { }

  ngOnInit() {

  }
}
