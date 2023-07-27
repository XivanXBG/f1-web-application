import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { StandingsComponent } from './pages/standings/standings.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ScheduleCardComponent } from './pages/schedule/schedule-card/schedule-card.component';
import { RaceCountdownComponent } from './shared/race-countdown/race-countdown.component';
import { CircuitDetailsComponent } from './pages/circuits/circuit-details.component';





@NgModule({
  declarations: [
    LandingPageComponent,
    StandingsComponent,
    ScheduleComponent,
    ScheduleCardComponent,
    RaceCountdownComponent,
    CircuitDetailsComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterLink

  ]
})
export class FeaturesModule { }
