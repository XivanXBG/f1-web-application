// auth.service.ts

import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { IUser } from '../interfaces/user';
import firebase from 'firebase/compat/app';
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userData: any;
  private isLoggedInSubject: BehaviorSubject<boolean>; // Add a BehaviorSubject to track login status changes
  public isLoggedIn$: Observable<boolean>;
  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.isLoggedInSubject = new BehaviorSubject<boolean>(false); // Initialize the BehaviorSubject with the default value (false)
    this.isLoggedIn$ = this.isLoggedInSubject.asObservable(); // Expose the isLoggedInSubject as an Observable

    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        this.isLoggedInSubject.next(true); // Emit true when user is logged in
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
        this.isLoggedInSubject.next(false); // Emit false when user is logged out
      }
    });
  }

  SignUp(email: string, password: string): Promise<void | string> {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        // Additional user data can be stored in Firestore
        this.SetUserData(result.user);
        // ... other code ...
      })
      .catch((error) => {
        const errorCode = error.code;
        let errorMessage: string;
        switch (errorCode) {
          case 'auth/email-already-in-use':
            errorMessage = 'This email is already in use. Please use a different email.';
            break;
          case 'auth/invalid-email':
            errorMessage = 'Invalid email. Please enter a valid email address.';
            break;
          case 'auth/weak-password':
            errorMessage = 'Weak password. Please enter a stronger password.';
            break;
          // Add more cases for other possible error codes
          default:
            errorMessage = 'An error occurred. Please try again later.';
            break;
        }
        return Promise.reject(errorMessage); // Reject the promise with the error message
      });
  }
  

  SignIn(email: string, password: string): Promise<void | string> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        // You can handle successful login here
        this.router.navigate(['/']);
      })
      .catch((error) => {
        const errorCode = error.code;
        let errorMessage: string;
        switch (errorCode) {
          case 'auth/user-not-found':
            errorMessage = 'User not found. Please check your email and password.';
            break;
          case 'auth/wrong-password':
            errorMessage = 'Invalid password. Please check your email and password.';
            break;
          // Add more cases for other possible error codes
          default:
            errorMessage = 'An error occurred. Please try again later.';
            break;
        }
        return Promise.reject(errorMessage); // Reject the promise with the error message
      });
  }
  

  private SetUserData(user: firebase.User) {
    const userRef: AngularFirestoreDocument<IUser> = this.afs.doc<IUser>(`users/${user.uid}`);

    // Set additional user data in Firestore if needed
    const customUserData: IUser = {
      email: user.email!,

      // Add other user properties here as needed
    };

    return userRef.set(customUserData, { merge: true });
  }

  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/']);
    });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false;
  }
}
