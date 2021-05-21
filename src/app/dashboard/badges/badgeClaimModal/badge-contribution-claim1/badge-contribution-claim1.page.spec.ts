import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BadgeContributionClaim1Page } from './badge-contribution-claim1.page';

describe('BadgeContributionClaim1Page', () => {
  let component: BadgeContributionClaim1Page;
  let fixture: ComponentFixture<BadgeContributionClaim1Page>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BadgeContributionClaim1Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BadgeContributionClaim1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
