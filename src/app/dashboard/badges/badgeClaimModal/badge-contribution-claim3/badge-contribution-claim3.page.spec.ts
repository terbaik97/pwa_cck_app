import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BadgeContributionClaim3Page } from './badge-contribution-claim3.page';

describe('BadgeContributionClaim3Page', () => {
  let component: BadgeContributionClaim3Page;
  let fixture: ComponentFixture<BadgeContributionClaim3Page>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BadgeContributionClaim3Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BadgeContributionClaim3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
