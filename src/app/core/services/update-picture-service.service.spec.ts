import { TestBed } from '@angular/core/testing';

import { UpdatePictureService } from './update-picture-service.service';

describe('UpdatePictureServiceService', () => {
  let service: UpdatePictureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdatePictureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
