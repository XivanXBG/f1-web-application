import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICurcuit } from 'src/app/core/interfaces/circuit';

@Component({
  selector: 'app-schedule-card',
  templateUrl: './schedule-card.component.html',
  styleUrls: ['./schedule-card.component.css']
})
export class ScheduleCardComponent implements OnInit {
  constructor(private router: Router) { }
  @Input() circuit!: ICurcuit;
  isHovered: boolean = false;
  ngOnInit(): void {

  }
  

  hasRaceEnded(race: any): string {

    if (race.date && race.time) {
      const endTime = new Date(`${race.date}T${race.time}`);
     
      
      const currentTime = new Date();
      const endTimeFormatted = new Date(
        `${endTime.getFullYear()}-${endTime.getMonth() + 1}-${endTime.getDate()} ${endTime.getHours()}:${endTime.getMinutes()}:${endTime.getSeconds()}`
      );
  
      return currentTime >= endTimeFormatted ? 'Finished' : 'Upcoming';
    }

    return 'Upcoming';
  }
  redirectToDetailsPage(circuitId: string) {
    const detailsPageUrl = `schedule/details/${circuitId}`;
    this.router.navigateByUrl(detailsPageUrl);
  }
  
  
}
