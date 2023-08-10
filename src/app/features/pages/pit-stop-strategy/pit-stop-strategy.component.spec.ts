import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PitStopStrategyComponent } from './pit-stop-strategy.component';

describe('PitStopStrategyComponent', () => {
  let component: PitStopStrategyComponent;
  let fixture: ComponentFixture<PitStopStrategyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PitStopStrategyComponent]
    });
    fixture = TestBed.createComponent(PitStopStrategyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
