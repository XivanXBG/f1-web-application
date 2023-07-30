import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore) {}

  updateUserData(userId: string, data: any): Promise<void> { // Replace 'any' with the appropriate user interface/type
    const userRef = this.firestore.collection('users').doc(userId);
    return userRef.update(data);
  }
}
