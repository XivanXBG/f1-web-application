import { TestBed } from '@angular/core/testing';
import { AuthPublicGuard } from './public-guard.guard';

describe('AuthPublicGuard', () => {
  let authPublicGuard: AuthPublicGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthPublicGuard],
    });

    authPublicGuard = TestBed.inject(AuthPublicGuard);
  });

  it('should be created', () => {
    expect(authPublicGuard).toBeTruthy();
  });
});
