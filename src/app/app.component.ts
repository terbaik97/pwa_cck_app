import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../app/services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  nickname: any;
  point: any;
  constructor(
    private _authService:AuthService
    
  ) {

  }

  ngOnInit() {
    this.nickname =this._authService.getUserNickname()
    this.point = this._authService.getUserPoint()
  }



}
