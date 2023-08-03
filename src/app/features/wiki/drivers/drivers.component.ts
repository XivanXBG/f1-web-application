import { Component, Input, OnInit } from '@angular/core';
import { IDriver } from 'src/app/core/interfaces/driver';
import { FirestoreService } from 'src/app/core/services/firestore.service';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css']
})
export class DriversComponent implements OnInit {
  drivers: IDriver[]
  constructor(private f1service: FirestoreService) { }
  ngOnInit(): void {
    this.f1service.getF1Drivers().subscribe((x)=>{
      this.drivers = x as IDriver[];
      this.drivers = this.drivers.sort((a,b)=>b.team.localeCompare(a.team))    
    })

  }
}