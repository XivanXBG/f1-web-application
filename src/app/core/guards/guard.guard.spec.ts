import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthGuard } from './guard.guard';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard], // Provide the AuthGuard
    });

    authGuard = TestBed.inject(AuthGuard); // Inject the AuthGuard
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy(); // Verify that the AuthGuard is created
  });

  // Add more tests for your AuthGuard as needed
});
