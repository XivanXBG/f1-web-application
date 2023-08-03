import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IDriver } from 'src/app/core/interfaces/driver';
import { FirestoreService, } from 'src/app/core/services/firestore.service';

@Component({
  selector: 'app-wiki-page',
  templateUrl: './wiki-page.component.html',
  styleUrls: ['./wiki-page.component.css']
})
export class WikiPageComponent implements OnInit {
  drivers: IDriver[]
  constructor(private f1service: FirestoreService) { }
  ngOnInit(): void {
    this.f1service.getF1Drivers().subscribe((x)=>{
      this.drivers = x as IDriver[];

      
    })
  }
}
