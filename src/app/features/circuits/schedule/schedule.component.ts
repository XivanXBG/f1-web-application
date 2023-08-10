import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/core/services/firestore.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  f1Circuits$: any[];
  driversCollection: any[];
  constructor(private fs: FirestoreService) { }

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

}
