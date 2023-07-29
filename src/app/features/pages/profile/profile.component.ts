import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { IUser } from '../../../core/interfaces/user'; // Replace 'path-to-your' with the actual path

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) { }

  isEditMode = false;
  user: IUser;

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      console.log(user);

    })
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
  }

  saveProfile(): void {
    // Save profile changes to the server
    this.toggleEditMode();
  }

  cancelEdit(): void {
    // Reset profile data to the original values
    this.toggleEditMode();
  }
}
