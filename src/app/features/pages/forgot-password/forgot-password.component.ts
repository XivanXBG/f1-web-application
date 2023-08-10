import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  errorMessage: string | null = null;

  constructor(private authService: AuthService) { }

  resetPassword(emailInput: HTMLInputElement) {
    this.errorMessage = null;
    if (emailInput) {
      const email = emailInput.value;


      this.authService.ForgotPassword(email)
        .then(() => {

          this.errorMessage = ('Password reset email sent');
        })
        .catch(error => {

          console.error('Error sending password reset email:', error);
          if (error.code === 'auth/invalid-email') {
            this.errorMessage = 'Invalid email format. Please enter a valid email address.';
          } else if (error.code === 'auth/user-not-found') {
            this.errorMessage = 'No user found with this email address.';
          } else {
            this.errorMessage = 'An error occurred. Please try again later.';
          }
        });
    }
  }
}
