import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContructorsComponent } from './contructors.component';

describe('ContructorsComponent', () => {
  let component: ContructorsComponent;
  let fixture: ComponentFixture<ContructorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContructorsComponent]
    });
    fixture = TestBed.createComponent(ContructorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
