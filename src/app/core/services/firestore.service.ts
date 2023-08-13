import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from "rxjs"
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private f1CircuitsCollection: AngularFirestoreCollection<any>;

  constructor(private firestore: AngularFirestore, private datePipe: DatePipe) { }

  updateUserData(userId: string, data: any): Promise<void> {
    const userRef = this.firestore.collection('users').doc(userId);
    return userRef.update(data);
  }

  getF1CircuitsData(): Observable<any[]> {
    this.f1CircuitsCollection = this.firestore.collection('circuits');
    return this.f1CircuitsCollection.snapshotChanges();
  }

  getRaceDetailsByRound(round: string): Observable<any[]> {
    return this.firestore.collection('circuits', ref => ref.where('round', '==', round)).snapshotChanges();
  }

  getF1CircuitDataById(circuitId: string): Observable<any> {
    return this.firestore.collection('circuits').doc(circuitId).valueChanges();
  }

  getF1Drivers(): Observable<any[]> {
    return this.firestore.collection('drivers').valueChanges();
  }
  getStandings(year: string) {
    return this.firestore.collection('standings').doc(year).valueChanges();
  }
  addDocumentToLeaderboard(playerName: string, score: number) {
    const leaderboardCollection = this.firestore.collection('leaderboard');
    const data = {
      playerName: playerName,
      score: score,
      timestamp: this.formatTimestamp(new Date())
    };
    return leaderboardCollection.add(data);
  }
  getLeaderboard(): Observable<any[]> {
    return this.firestore.collection('leaderboard').valueChanges();
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

  getF1Constructors(): Observable<any[]> {
    return this.firestore.collection('constructors').valueChanges();
  }
}
