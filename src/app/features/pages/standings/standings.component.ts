import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { StandingsService } from 'src/app/core/services/standings.service';


@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css']
})
export class StandingsComponent implements OnInit {
  public years: number[] = [];
  public isLoaded: boolean = false;
  standingsD!: any[];
  standingsC!: any[];

  constructor(private f1Service: StandingsService, private cdr: ChangeDetectorRef) {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 1950; year--) {
      this.years.push(year);
    }
  }
  selectedYear = 2023;
  onChange(newValue: any): void {
    this.selectedYear = newValue;

    this.isLoaded = false;
    this.f1Service.getSeasonDriverStandings((this.selectedYear).toString()).subscribe(d => {
      this.standingsD = d['MRData']['StandingsTable'].StandingsLists[0].DriverStandings;
      console.log(this.standingsD);

    });
    this.f1Service.getSeasonConstructorStandings((this.selectedYear).toString()).subscribe(d => {
      this.standingsC = d['MRData']['StandingsTable'].StandingsLists[0].ConstructorStandings;
      console.log(this.standingsC);

    });

    setTimeout(() => {

      this.isLoaded = true
      this.cdr.detectChanges();
    }, 3500)





  }
  ngOnInit(): void {
    setTimeout(() => {

      this.isLoaded = true
      this.cdr.detectChanges();
    }, 1000)

    this.f1Service.getSeasonDriverStandings((this.selectedYear).toString()).subscribe(d => {
      this.standingsD = d['MRData']['StandingsTable'].StandingsLists[0].DriverStandings;
      this.isLoaded = true;
    });
    this.f1Service.getSeasonConstructorStandings((this.selectedYear).toString()).subscribe(d => {
      this.standingsC = d['MRData']['StandingsTable'].StandingsLists[0].ConstructorStandings;
      this.isLoaded = true;
    });

  }
}

