import {NgModule} from '@angular/core'
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { StandingsComponent } from './pages/standings/standings.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';




@NgModule({
  declarations: [
    LandingPageComponent,
    StandingsComponent,
    ScheduleComponent,


  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterLink

  ]
})
export class FeaturesModule { }
