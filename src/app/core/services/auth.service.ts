import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { IUser } from '../interfaces/user';
import firebase from 'firebase/compat/app';
import { BehaviorSubject, Observable } from "rxjs";
import { GoogleAuthProvider, GithubAuthProvider} from "@angular/fire/auth"

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;
  data: IUser = {
    email: "",
    name: '',
    favoriteConstructor: '',
    favoriteDriver: '',
    favoriteCircuit: '',
    profilePictureUrl: "",
  };
  private isLoggedInSubject: BehaviorSubject<boolean>;
  public isLoggedIn$: Observable<boolean>;

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.isLoggedInSubject = new BehaviorSubject<boolean>(false);
    this.isLoggedIn$ = this.isLoggedInSubject.asObservable();

    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        this.isLoggedInSubject.next(true);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
        this.isLoggedInSubject.next(false);
      }
    });
  }

  googleSingIn() {
    return this.afAuth.signInWithPopup(new GoogleAuthProvider).then((res) => {
      if(res.additionalUserInfo.isNewUser){
        this.data.email = res.user.email;
        this.router.navigate(['/']);
        this.SetUserData(res.user, this.data)
      }
      
      
    })
  }
 
  yahooSignIn() {
  const yahooAuthProvider = new firebase.auth.OAuthProvider('yahoo.com');

  return this.afAuth.signInWithPopup(yahooAuthProvider).then((res) => {
    if(res.additionalUserInfo.isNewUser){
      this.data.email = res.user.email;
      this.router.navigate(['/']);
      this.SetUserData(res.user, this.data)
    }
  });
}


  loginWithGitHub() {
    return this.afAuth.signInWithPopup(new GithubAuthProvider).then((res) => {
      if(res.additionalUserInfo.isNewUser){
        this.data.email = res.user.email;
        this.router.navigate(['/']);
        this.SetUserData(res.user, this.data)
      }
    })
  }

  SignUp(userData: IUser, password: string): Promise<void | string> {
    return this.afAuth
      .createUserWithEmailAndPassword(userData.email, password)
      .then((result) => {
        this.SendVerificationMail();
        this.SetUserData(result.user, userData);
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
          default:
            errorMessage = 'An error occurred. Please try again later.';
            break;
        }
        return Promise.reject(errorMessage);
      });
  }

  SignIn(email: string, password: string): Promise<void | string> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
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
          default:
            errorMessage = 'An error occurred. Please try again later.';
            break;
        }
        return Promise.reject(errorMessage);
      });
  }

  private SetUserData(user: firebase.User, userData?: IUser) {
    const userRef: AngularFirestoreDocument<IUser> = this.afs.doc<IUser>(`users/${user.uid}`);
    const { email, name, favoriteDriver, favoriteConstructor, favoriteCircuit } = userData;
    const profilePictureUrl = "";
    const customUserData: IUser = { uid: user.uid, email, name, favoriteDriver, favoriteConstructor, favoriteCircuit, emailVerified: user.emailVerified, profilePictureUrl };
    return userRef.set(customUserData, { merge: true });
  }

  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }

  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail);
  }

  async getUserInfo(userId: string) {
    try {
      const firestore = firebase.firestore();
      const userRef = firestore.collection('users').doc(userId);
      const doc = await userRef.get();
      if (doc.exists) {
        const userData = doc.data();
        return userData;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }

  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/']);
    });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;
  }
}
