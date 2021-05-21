import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BadgeLoginClaim2Page } from './badge-login-claim2.page';

describe('BadgeLoginClaim2Page', () => {
  let component: BadgeLoginClaim2Page;
  let fixture: ComponentFixture<BadgeLoginClaim2Page>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BadgeLoginClaim2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BadgeLoginClaim2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
