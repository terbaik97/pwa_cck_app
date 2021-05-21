import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BadgeLoginClaim4Page } from './badge-login-claim4.page';

describe('BadgeLoginClaim4Page', () => {
  let component: BadgeLoginClaim4Page;
  let fixture: ComponentFixture<BadgeLoginClaim4Page>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BadgeLoginClaim4Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BadgeLoginClaim4Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
