import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleComponent } from './schedule/schedule.component';
import { CircuitDetailsComponent } from './circuit-details/circuit-details.component';

const routes: Routes = [
  {
    path: '',
    component: ScheduleComponent
  },
  {
    path: 'details/:id',
    component: CircuitDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CircuitsRoutingModule { }
