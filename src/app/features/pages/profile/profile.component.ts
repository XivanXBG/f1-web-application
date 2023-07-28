import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  isEditMode = false;
  firstName = 'John';
  lastName = 'Doe';
  email = 'john.doe@example.com';
  favoriteDriver = 'Lewis Hamilton';
  favoriteConstructor = 'Mercedes';
  favoriteCircuit = 'Monaco Grand Prix';

  constructor() { }

  ngOnInit(): void {
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
