import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class StandingsService {

  constructor(private http: HttpClient) {
  }

  getSeasonDriverStandings(season: string): Observable<any> {
    return this.http.get(`https://ergast.com/api/f1/${season}/driverStandings.json`)  
  }
  getSeasonConstructorStandings(season: string): Observable<any> {
    return this.http.get(`http://ergast.com/api/f1/${season}/constructorStandings.json`)
  }
}
