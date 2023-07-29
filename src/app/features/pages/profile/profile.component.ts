import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { IUser } from '../../../core/interfaces/user'; // Replace 'path-to-your' with the actual path
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private authService: AuthService
  ) { }

  isEditMode = false;
  user: object;

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {

      const data = this.authService.getUserInfo(user.uid).then((res) => {
        this.user = res

      });

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
