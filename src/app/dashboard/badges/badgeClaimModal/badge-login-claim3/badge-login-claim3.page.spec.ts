import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BadgeLoginClaim3Page } from './badge-login-claim3.page';

describe('BadgeLoginClaim3Page', () => {
  let component: BadgeLoginClaim3Page;
  let fixture: ComponentFixture<BadgeLoginClaim3Page>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BadgeLoginClaim3Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BadgeLoginClaim3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
