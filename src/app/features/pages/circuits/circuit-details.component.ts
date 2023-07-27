import { Component, OnInit } from '@angular/core';
import { StandingsService } from 'src/app/core/services/standings.service';


@Component({
  selector: 'app-circuit-details',
  templateUrl: './circuit-details.component.html',
  styleUrls: ['./circuit-details.component.css']
})
export class CircuitDetailsComponent implements OnInit {
 
  constructor(private f1Service: StandingsService){}
  ngOnInit(): void {
    
    console.log(this.f1Service.getCircuits());
    
  }
  
}

