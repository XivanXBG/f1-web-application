import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

import { Observable } from "rxjs"
import { DatePipe } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore,private datePipe: DatePipe) {
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
  getRaceDetailsByRound(round: string): Observable<any[]> {
    return this.firestore.collection('circuits', ref => ref.where('round', '==', round)).snapshotChanges();
  }
  getF1CircuitDataById(circuitId: string) {

    return this.firestore.collection('circuits').doc(circuitId).valueChanges();

  }
  getF1Drivers() {

    return this.firestore.collection('drivers').valueChanges();

  }
  getLeaderboard() {
    
    return this.firestore.collection('leaderboard').valueChanges()
  }
  addDocumentToLeaderboard(playerName: string, score: number) {
    const leaderboardCollection = this.firestore.collection('leaderboard');
  
    const data = {
      playerName: playerName,
      score: score,
      timestamp: this.formatTimestamp(new Date())// Convert to ISO string
    };
  
    return leaderboardCollection.add(data);
  }
  formatTimestamp(timestamp: Date): string {
    return this.datePipe.transform(timestamp, 'yy-MM-dd');
  }
  async updateUserProfilePicture(userId: string, profilePictureUrl: string): Promise<void> {
    try {
      await this.firestore.collection('users').doc(userId).update({ profilePictureUrl });


    } catch (error) {
      console.error('Error updating profile picture:', error);
      throw error;
    }
  }
  getF1Constructors() {

    return this.firestore.collection('constructors').valueChanges();

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
