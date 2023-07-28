import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { StandingsComponent } from './pages/standings/standings.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ScheduleCardComponent } from './pages/schedule/schedule-card/schedule-card.component';
import { RaceCountdownComponent } from './shared/race-countdown/race-countdown.component';
import { CircuitDetailsComponent } from './pages/circuits/circuit-details.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';





@NgModule({
  declarations: [
    LandingPageComponent,
    StandingsComponent,
    ScheduleComponent,
    ScheduleCardComponent,
    RaceCountdownComponent,
    CircuitDetailsComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule

  ]
})
export class FeaturesModule { }
