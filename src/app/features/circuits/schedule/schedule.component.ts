import { Component, OnInit } from '@angular/core';
import { StandingsService } from 'src/app/core/services/standings.service';
import { FirestoreService } from 'src/app/core/services/firestore.service';

import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  f1Circuits$: any[];
  driversCollection: any[];
  constructor(private f1Service: StandingsService, private fs: FirestoreService, private firestore: AngularFirestore) { }

  ngOnInit(): void {

    this.fs.getF1CircuitsData().subscribe((querySnapshot) => {
      this.f1Circuits$ = querySnapshot.map(docChange => {
        const circuit = docChange.payload.doc.data();
        const idFire = docChange.payload.doc.id;
        return { idFire, ...circuit };
      }

      );
     

      this.f1Circuits$.sort((a, b) => a.round - b.round);

    })
  }
  // loadData() {
  //   for (let index = 0; index < 22; index++) {
  //     let obj = {
  //       name: "Max Verstappen",
  //       team: "Red Bull Racing",
  //       country: "Netherlands",
  //       podiums: 89,
  //       dateOfBirth: '30/09/1997',
  //       placeOfBirth: 'Hasselt,Belgium',
  //       number: 1,
  //       image: 'https://media.formula1.com/content/dam/fom-website/drivers/2023Drivers/verstappen.jpg.img.2048.medium.jpg/1677069646195.jpg'
  //     }
  //     this.firestore.collection('drivers').add(obj);

  //     // 
  //   }


  
}
