import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CircuitsRoutingModule } from './circuits-routing.module';
import { ScheduleCardComponent } from './schedule-card/schedule-card.component';
import { CircuitDetailsComponent } from './circuit-details/circuit-details.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { FeaturesModule } from '../features.module';


@NgModule({
  declarations: [
    ScheduleCardComponent,
    CircuitDetailsComponent,
    ScheduleComponent
  ],
  imports: [
    CommonModule,
    CircuitsRoutingModule,
    FeaturesModule
    
  ]
})
export class CircuitsModule { }
