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

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  loginWithGoogle() {
    this.authService.googleSingIn();
  }
  loginWithGitHub(){
    this.authService.loginWithGitHub()

  }
  loginWithFacebook(){
    this.authService.loginWithFacebook()

  }
  onSubmit(): void {
    this.loginError = null; // Clear previous error message
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    this.authService.SignIn(email, password)
      .then(() => {
        this.router.navigate(['/'])
      })
      .catch((error) => {
        // Handle login errors here
        console.error(error);
        this.loginError = error; // Display error message to the user
      });
  }

}
