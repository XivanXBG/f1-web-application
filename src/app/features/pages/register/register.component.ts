import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
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
  circuits: ICurcuit[]
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router,private firestore:FirestoreService) { }

  ngOnInit(): void {
    this.getInfo();
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required], // Remove the custom validator here
      favoriteDriver: [''],
      favoriteConstructor: [''],
      favoriteCircuit: ['']
    }, { validator: this.passwordConfirmationValidator }); // Add the custom validator here
  }
  getInfo(): void {
    this.firestore.getF1Drivers().subscribe(x => { 
      
      
      this.drivers = x as IDriver[];
    })
    this.firestore.getF1Constructors().subscribe(x => {
      this.constructors = x as IConstructors[];
    })
    this.firestore.getF1CircuitsData().subscribe(x => {
      this.circuits = x.map(docChange => {
        const circuit = docChange.payload.doc.data();
        return { ...circuit } as ICurcuit;
      })
      console.log(this.circuits);
    })
  }
  loginWithGoogle(){
    this.authService.googleSingIn()
  }
  loginWithGitHub(){
    this.authService.loginWithGitHub()

  }
  loginWithFacebook(){
    this.authService.loginWithFacebook()

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
      confirmPasswordControl.setErrors({ confirmPasswordMismatch: true });
      return { confirmPasswordMismatch: true };
    } else {
      confirmPasswordControl.setErrors(null);
      return null;
    }
  };
}
