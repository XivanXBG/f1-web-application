import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './features/landing-page/landing-page.component';
import { StandingsComponent } from './features/pages/standings/standings.component';
import { LoginComponent } from './features/pages/login/login.component';
import { RegisterComponent } from './features/pages/register/register.component';
import { ProfileComponent } from './features/pages/profile/profile.component';
import { AuthGuard } from './core/guards/guard.guard';
import { ForgotPasswordComponent } from './features/pages/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './features/pages/verify-email/verify-email.component';
import { AuthPublicGuard } from './core/guards/public-guard.guard';
import { NotFoundComponent } from './features/pages/not-found/not-found.component';
import { PitStopStrategyComponent } from './features/pages/pit-stop-strategy/pit-stop-strategy.component';


const routes: Routes = [
  {
    path: "",
    component: LandingPageComponent
  },

  {
    path: 'schedule',
    loadChildren: () => import('./features/circuits/circuits.module').then((m) => m.CircuitsModule),
  },
  {
    path: 'wiki',
    loadChildren: () => import('./features/wiki/wiki.module').then((m) => m.WikiModule),
  },
  {
    path: "standings",
    component: StandingsComponent
  },
  {
    path: "login",
    component: LoginComponent,
    canActivate: [AuthPublicGuard]
  }
  ,
  {
    path: "register",
    component: RegisterComponent,
    canActivate: [AuthPublicGuard]
  },

  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [AuthPublicGuard]
  },
  {
    path: 'verify-email-address',
    component: VerifyEmailComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'auth-callback',
    component: LandingPageComponent
  },
  {
    path: 'pit-stop-game',
    component: PitStopStrategyComponent, canActivate: [AuthGuard]
  },

  {
    path: '**',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '/not-found'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
