import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { StandingsComponent } from './pages/standings/standings.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { RaceCountdownComponent } from './shared/race-countdown/race-countdown.component';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MatIconModule } from '@angular/material/icon';









@NgModule({
  declarations: [
    LandingPageComponent,
    StandingsComponent,

    RaceCountdownComponent,

    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    VerifyEmailComponent,
    ForgotPasswordComponent,
    NotFoundComponent,


  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MatIconModule,


  ],
  exports:[
    RaceCountdownComponent
  ]
})
export class FeaturesModule { }
