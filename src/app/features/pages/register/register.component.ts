import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { IUser } from 'src/app/core/interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  errorMessage: string | null = null;
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required,this.passwordConfirmationValidator]],
      favoriteDriver: [''],
      favoriteConstructor: [''],
      favoriteCircuit: ['']
    });
  }

  onSubmit(): void {
    this.errorMessage = null; // Clear previous error message
  
    const userData: IUser = {
      email: this.registerForm.get('email')?.value,
      name: this.registerForm.get('name')?.value,
      favoriteConstructor: this.registerForm.get('favoriteConstructor')?.value,
      favoriteDriver: this.registerForm.get('favoriteDriver')?.value,
      favoriteCircuit: this.registerForm.get('favoriteCircuit')?.value,
    };
  
    this.authService.SignUp(userData, this.registerForm.get('password').value)
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch((error) => {
        // Handle Sign Up errors here
        console.error(error);
        this.errorMessage = error; // Display error message to the user
      });
  }
  
  passwordConfirmationValidator: ValidatorFn = (formGroup: FormGroup): ValidationErrors | null => {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmPassword');

    if (passwordControl && confirmPasswordControl && passwordControl.value !== confirmPasswordControl.value) {
        return { confirmPasswordMismatch: true };
    }

    return null;
};

}
