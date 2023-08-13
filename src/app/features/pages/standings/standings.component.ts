import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/core/services/firestore.service';


@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css']
})
export class StandingsComponent implements OnInit {
  public years: number[] = [];
  indexD = 1;
  indexC = 1;
  constructors = [];
  drivers = [];
  selectedYear = 2023;

  constructor(private firestore: FirestoreService) {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 1950; year--) {
      this.years.push(year);
    }
  }

  ngOnInit(): void {
    this.loadData(this.selectedYear);
  }

  onChange(newValue: any): void {
    this.selectedYear = newValue;
    this.loadData(this.selectedYear)
  }
  getKeyValue(input: any) {
    
    const key = Object.keys(input)[0];;  
    const value: string = Object.values(input)[0] as string;

    return {key,value}

  }



  private loadData(year: number): void {
    this.firestore.getStandings(year.toString()).subscribe(x => {
      this.drivers = x['drivers'];
      this.constructors = x['contructors'];

    });
    this.indexC = 1;
    this.indexD = 1;
  }

}
