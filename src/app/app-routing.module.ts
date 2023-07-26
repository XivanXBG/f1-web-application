import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './features/landing-page/landing-page.component';
import { StandingsComponent } from './features/pages/standings/standings.component';

const routes: Routes = [
  {
    path:"",
    component: LandingPageComponent
  },
  {
    path:"standings",
    component:StandingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
