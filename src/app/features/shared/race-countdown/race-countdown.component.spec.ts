import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceCountdownComponent } from './race-countdown.component';

describe('RaceCountdownComponent', () => {
  let component: RaceCountdownComponent;
  let fixture: ComponentFixture<RaceCountdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RaceCountdownComponent]
    });
    fixture = TestBed.createComponent(RaceCountdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
