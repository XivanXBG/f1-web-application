import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { IUser } from '../../../core/interfaces/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { FirestoreService } from 'src/app/core/services/firestore.service';
import { FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @ViewChild('profileForm') form: FormGroup;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private authService: AuthService,
    private firestore: FirestoreService
  ) { }

  isEditMode = false;
  user: IUser;
  updateInfo() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.authService.getUserInfo(user.uid).then((res) => {
          this.user = res as IUser;
        });
      }
    });
  }
  ngOnInit(): void {
    this.updateInfo()
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
  }

  saveProfile(): void {
    this.toggleEditMode();
    this.updateUserData();
    this.updateInfo()
  }

  cancelEdit(): void {
    this.toggleEditMode();
  }

  updateUserData(): void {
    const formValues = this.form.value;
   

    const userDataToUpdate = {
      name: formValues.firstName || this.user.name,
      favoriteDriver: formValues.favoriteDriver || "",
      favoriteConstructor: formValues.favoriteConstructor || "",
      favoriteCircuit: formValues.favoriteCircuit || ""
      // Add other fields you want to update
    };


    // Update the user's data in Firestore using the Firestore service
    this.firestore.updateUserData(this.user.uid, userDataToUpdate)
      .then(() => {
        console.log('User data updated successfully!');
      })
      .catch((error) => {
        console.error('Error updating user data:', error);
      });
  }
}
