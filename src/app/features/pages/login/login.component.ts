import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginError: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Initialize the login form with email and password fields
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Function to handle Google login
  loginWithGoogle() {
    this.authService.googleSingIn();
  }

  // Function to handle GitHub login
  loginWithGitHub() {
    this.authService.loginWithGitHub();
  }

  // Function to handle Facebook login
  loginWithFacebook() {
    this.authService.loginWithFacebook();
  }

  // Function to handle form submission
  onSubmit(): void {
    this.loginError = null; // Clear previous login errors
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    this.authService.SignIn(email, password)
      .then(() => {
        // Navigate to the home page on successful login
        this.router.navigate(['/']);
      })
      .catch((error) => {
        // Display login error if authentication fails
        this.loginError = error;
      });
  }
}