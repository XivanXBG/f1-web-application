import { Component, OnInit } from '@angular/core';
import { StandingsService } from 'src/app/core/services/standings.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-race-countdown',
  templateUrl: './race-countdown.component.html',
  styleUrls: ['./race-countdown.component.css']
})
export class RaceCountdownComponent implements OnInit {

  constructor(private f1Service: StandingsService, private router:Router) {

  }
  schedule!: any[]
  index: number = 11
  raceStartDate!: Date;
  countdown!: string;

  ngOnInit(): void {
    if (this.index > 23) {
      this.index = 0;
    }
    this.f1Service.getSchedule().subscribe(x => {
      this.schedule = x['MRData']['RaceTable'].Races;
      const nextRace = this.schedule[this.index];
      this.raceStartDate = new Date(`${nextRace.date}T${nextRace.time}`);
    });

    setInterval(() => {
      this.updateCountDown();
    }, 1000)

  }
  updateCountDown() {
    const currentTime = new Date();
    const timeRemaining = this.raceStartDate.getTime() - currentTime.getTime();

    if (timeRemaining <= 0) {
      this.countdown = "Race has started!"
      this.index += 1;
      return
    }

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    this.countdown = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
  }

  showRace(){
    this.router.navigate(['/schedule'])
  }

}
