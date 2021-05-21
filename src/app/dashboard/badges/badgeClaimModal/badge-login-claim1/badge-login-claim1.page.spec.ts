import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BadgeLoginClaim1Page } from './badge-login-claim1.page';

describe('BadgeLoginClaim1Page', () => {
  let component: BadgeLoginClaim1Page;
  let fixture: ComponentFixture<BadgeLoginClaim1Page>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BadgeLoginClaim1Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BadgeLoginClaim1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
