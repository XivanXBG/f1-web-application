import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthPublicGuard } from './public-guard.guard'; // Make sure the path to your guard is correct

describe('AuthPublicGuard', () => {
  let authPublicGuard: AuthPublicGuard; // Create a variable to hold the instance of AuthPublicGuard

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthPublicGuard], // Provide the AuthPublicGuard
    });

    authPublicGuard = TestBed.inject(AuthPublicGuard); // Inject the AuthPublicGuard
  });

  it('should be created', () => {
    expect(authPublicGuard).toBeTruthy(); // Verify that the AuthPublicGuard is created
  });

  // Add more tests for AuthPublicGuard as needed
});
