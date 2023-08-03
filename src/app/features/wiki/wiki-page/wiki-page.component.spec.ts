import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WikiPageComponent } from './wiki-page.component';

describe('WikiPageComponent', () => {
  let component: WikiPageComponent;
  let fixture: ComponentFixture<WikiPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WikiPageComponent]
    });
    fixture = TestBed.createComponent(WikiPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
