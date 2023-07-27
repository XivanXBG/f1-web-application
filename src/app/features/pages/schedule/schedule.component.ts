import { Component, OnInit } from '@angular/core';
import { StandingsService } from 'src/app/core/services/standings.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  schedule!: any[];
  constructor(private f1Service: StandingsService) { }

  ngOnInit(): void {
    this.f1Service.getSchedule().subscribe(x => {
      this.schedule = x['MRData']['RaceTable'].Races;   
    })
  }
}
