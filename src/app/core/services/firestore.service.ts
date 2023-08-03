import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { StandingsService } from './standings.service';
import { Observable } from "rxjs"
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, private f1Service: StandingsService) {
  }

  private f1CircuitsCollection: AngularFirestoreCollection<any>;

  updateUserData(userId: string, data: any): Promise<void> { // Replace 'any' with the appropriate user interface/type
    const userRef = this.firestore.collection('users').doc(userId);
    return userRef.update(data);
  }
  getF1CircuitsData() {
    this.f1CircuitsCollection = this.firestore.collection('circuits');
    return this.f1CircuitsCollection.snapshotChanges();

  }
  getF1CircuitDataById(circuitId: string) {

    return this.firestore.collection('circuits').doc(circuitId).valueChanges();

  }
  // addCircuits(): void {




  //   this.f1Service.getSchedule().subscribe(x => {
  //     this.circuits = x['MRData']['RaceTable'].Races;
  //     for (const circuit of this.circuits) {


  //       let obj = {
  //         round: circuit.round,
  //         date: circuit.date,
  //         time: circuit.time,
  //         raceName: circuit.raceName,
  //         id: circuit.Circuit.circuitId,
  //         circuitName: circuit.Circuit.circuitName,
  //         firstGP: 1991,
  //         circuitLength: 400,
  //         lapRecord: 1.123,
  //         laps:66,
  //         recordHolder: "Max Verstappen",
  //         image: "img"

  //       }
  //       this.f1RacesData.push(obj);
  //       this.firestore.collection('circuits').add(obj);

  //     }
  //   })


  // }

}
