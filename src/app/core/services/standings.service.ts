import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'







@Injectable({
  providedIn: 'root'
})
export class StandingsService implements OnInit {
  drivers: any[] = [];
  constructor(private http: HttpClient,) {
  }
  ngOnInit(): void {


  }

  getSeasonDriverStandings(season: string): Observable<any> {
    return this.http.get(`https://ergast.com/api/f1/${season}/driverStandings.json`)
  }
  getSeasonConstructorStandings(season: string): Observable<any> {
    return this.http.get(`http://ergast.com/api/f1/${season}/constructorStandings.json`)
  }
  getSchedule(): Observable<any> {
    return this.http.get(`http://ergast.com/api/f1/current.json `)
  }
  getDrivers(): any {
    return this.http.get('http://ergast.com/api/f1/2023/drivers.json')
  }

  getCircuit(circuit: string): Observable<any> {
    return this.http.get(`http://ergast.com/api/f1/${circuit}/circuits`)
  }

}
