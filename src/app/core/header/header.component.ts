import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { IUser } from '../interfaces/user';
import { UpdatePictureService } from '../services/update-picture-service.service';
import { NgZone } from '@angular/core';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogged: boolean = false;
  user: IUser
  constructor(private authService: AuthService, public router: Router, private afAuth: AngularFireAuth, private cdRef: ChangeDetectorRef, private ups: UpdatePictureService, private ngZone: NgZone) { }

  ngOnInit(): void {
    // Subscribe to the isLoggedIn$ observable to get real-time updates
    this.authService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLogged = loggedIn;

    });
    this.getInfo();
    this.ups.headerRefresh$.subscribe(() => {
      this.refreshHeader(); // Call your refresh logic
    });
  }
  public refreshHeader(): void {
    this.getInfo();
  }
  getInfo(): void {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.authService.getUserInfo(user.uid).then((res) => {
          this.user = res as IUser;

        });
      }
    });
  }
  logoutHandler() {
    console.log('ads');

    this.authService.SignOut();
    this.router.navigate(['/'])
  }

  // You can also use the isLogged property directly in the template to conditionally show content based on the user's login status.
}
