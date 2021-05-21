import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BadgeContributionClaim4Page } from './badge-contribution-claim4.page';

describe('BadgeContributionClaim4Page', () => {
  let component: BadgeContributionClaim4Page;
  let fixture: ComponentFixture<BadgeContributionClaim4Page>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BadgeContributionClaim4Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BadgeContributionClaim4Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
