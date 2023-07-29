import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogged: boolean = false;

  constructor(private authService: AuthService,public router:Router) {}

  ngOnInit(): void {
    // Subscribe to the isLoggedIn$ observable to get real-time updates
    this.authService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLogged = loggedIn;
      console.log(this.isLogged);
    });
  }

  logoutHandler(){
    console.log('ads');
    
    this.authService.SignOut();
    this.router.navigate(['/'])
  }

  // You can also use the isLogged property directly in the template to conditionally show content based on the user's login status.
}
