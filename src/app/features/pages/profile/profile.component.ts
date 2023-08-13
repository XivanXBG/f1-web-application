import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { IUser } from '../../../core/interfaces/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { FirestoreService } from 'src/app/core/services/firestore.service';
import { FormGroup } from '@angular/forms';
import { IDriver } from 'src/app/core/interfaces/driver';
import { IConstructors } from 'src/app/core/interfaces/constructors';
import { ICurcuit } from 'src/app/core/interfaces/circuit';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { finalize } from 'rxjs/operators';
import { UpdatePictureService } from "../../../core/services/update-picture-service.service"



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @ViewChild('profileForm') form: FormGroup;
  drivers: IDriver[];
  constructors: IConstructors[];
  circuits: ICurcuit[]
  constructor(
    private afAuth: AngularFireAuth,
    private storage: AngularFireStorage,
    private authService: AuthService,
    private firestore: FirestoreService,
    private ups: UpdatePictureService


  ) { }


  favoriteDriver: string;
  favoriteConstructor: string;
  favoriteCircuit: string;
  isEditMode = false;
  user: IUser;

  ngOnInit(): void {


    this.getInfo();
    this.updateInfo();
   

  }
  async uploadProfilePicture(event: any): Promise<void> {
    const user = await this.afAuth.currentUser;
    if (user && event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const filePath = `profile-pictures/${user.uid}`;
      const fileRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath, file);

      uploadTask.snapshotChanges().pipe(
        finalize(async () => {
          const downloadURL = await fileRef.getDownloadURL().toPromise();
          await this.firestore.updateUserProfilePicture(user.uid, downloadURL);
          this.updateInfo();
          this.ups.triggerHeaderRefresh();
        })
      ).subscribe();
    }
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
    })
  }
  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
  }

  updateInfo() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.authService.getUserInfo(user.uid).then((res) => {
     
          this.user = res as IUser;
          
        });
      }
    });
  }

  saveProfile(): void {
    this.toggleEditMode();
    this.updateUserData();
    this.updateInfo();
  }

  cancelEdit(): void {
    this.toggleEditMode();
  }

  updateUserData(): void {
    const formValues = this.form.value;

    const userDataToUpdate = {
      name: formValues.firstName || this.user.name,
      favoriteDriver: formValues.favoriteDriver || this.user.favoriteDriver,
      favoriteConstructor: formValues.favoriteConstructor || this.user.favoriteConstructor,
      favoriteCircuit: formValues.favoriteCircuit || this.user.favoriteCircuit,

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