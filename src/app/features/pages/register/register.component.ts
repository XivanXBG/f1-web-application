import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { IUser } from 'src/app/core/interfaces/user';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/core/services/firestore.service';
import { IDriver } from 'src/app/core/interfaces/driver';
import { IConstructors } from 'src/app/core/interfaces/constructors';
import { ICurcuit } from 'src/app/core/interfaces/circuit';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  errorMessage: string | null = null;
  drivers: IDriver[];
  constructors: IConstructors[];
  circuits: ICurcuit[];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private firestore: FirestoreService
  ) {}

  ngOnInit(): void {
    this.getInfo();
    this.initializeForm();
  }

  initializeForm(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      favoriteDriver: [''],
      favoriteConstructor: [''],
      favoriteCircuit: ['']
    }, { validator: this.passwordConfirmationValidator });
  }

  getInfo(): void {
    this.firestore.getF1Drivers().subscribe(drivers => {
      this.drivers = drivers;
    });

    this.firestore.getF1Constructors().subscribe(constructors => {
      this.constructors = constructors;
    });

    this.firestore.getF1CircuitsData().subscribe(circuits => {
      this.circuits = circuits.map(docChange => docChange.payload.doc.data() as ICurcuit);
     
    });
  }

  loginWithGoogle(): void {
    this.authService.googleSingIn();
    this.router.navigate(['/']);
  }

  loginWithGitHub(): void {
    this.authService.loginWithGitHub();
    this.router.navigate(['/']);
  }

  loginWithYahoo(): void {
    this.authService.yahooSignIn();
    this.router.navigate(['/']);
  }

  onSubmit(): void {
    this.errorMessage = null;

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
      .catch(error => {
        console.error(error);
        this.errorMessage = error;
      });
  }

  passwordConfirmationValidator: ValidatorFn = formGroup => {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmPassword');

    if (passwordControl && confirmPasswordControl && passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ confirmPasswordMismatch: true });
      return { confirmPasswordMismatch: true };
    } else {
      confirmPasswordControl.setErrors(null);
      return null;
    }
  };
}
