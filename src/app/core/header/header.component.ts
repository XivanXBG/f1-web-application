import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { IUser } from '../interfaces/user';
import { UpdatePictureService } from '../services/update-picture-service.service';




@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  isLogged: boolean = false;
  user: IUser;

  constructor(
      private authService: AuthService,
      public router: Router,
      private afAuth: AngularFireAuth,
      private ups: UpdatePictureService
  ) {}

  ngOnInit(): void {
      this.authService.isLoggedIn$.subscribe((loggedIn) => {
          this.isLogged = loggedIn; //checks if user is logged in
      });
      this.getInfo(); //receives info
      this.ups.headerRefresh$.subscribe(() => { //refresh the header when a profile picture is uploaded
          this.refreshHeader();
      });
  }

  refreshHeader(): void { //refresh the header when a profile picture is uploaded
      this.getInfo();
  }

  getInfo(): void { //receives the user info
      this.afAuth.authState.subscribe((user) => {
          if (user) {
              this.authService.getUserInfo(user.uid).then((res) => {
                  this.user = res as IUser;
              });
          }
      });
  }

  logoutHandler() { //handles the logout
      this.authService.SignOut();
      this.router.navigate(['/']);
  }
}

