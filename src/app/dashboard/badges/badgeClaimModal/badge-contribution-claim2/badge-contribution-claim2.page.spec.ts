import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BadgeContributionClaim2Page } from './badge-contribution-claim2.page';

describe('BadgeContributionClaim2Page', () => {
  let component: BadgeContributionClaim2Page;
  let fixture: ComponentFixture<BadgeContributionClaim2Page>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BadgeContributionClaim2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BadgeContributionClaim2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
