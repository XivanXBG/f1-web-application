import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './features/landing-page/landing-page.component';
import { StandingsComponent } from './features/pages/standings/standings.component';
import { ScheduleComponent } from './features/pages/schedule/schedule.component';
import { CircuitDetailsComponent } from './features/pages/circuits/circuit-details.component';
import { LoginComponent } from './features/pages/login/login.component';
import { RegisterComponent } from './features/pages/register/register.component';
import { ProfileComponent } from './features/pages/profile/profile.component';
import { AuthGuard } from './core/guards/guard.guard';

const routes: Routes = [
  {
    path: "",
    component: LandingPageComponent
  },
  {
    path: "standings",
    component: StandingsComponent
  },
  {
    path: "schedule",
    component: ScheduleComponent
  },
  {
    path: "circuits",
    component: CircuitDetailsComponent
  }
  ,
  {
    path: "login",
    component: LoginComponent
  }
  ,
  {
    path: "register",
    component: RegisterComponent
  },
  
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
