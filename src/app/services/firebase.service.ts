import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {
  collectionName = 'Current-Badge';
  collectionClaimed = 'claim-badges';

  constructor(private firestore: AngularFirestore) { }

  // create_student(record) {
  //   return this.firestore.collection(this.collectionName).add(record);
  // }

  read_current_badge() {
    return this.firestore.collection(this.collectionName).snapshotChanges();
  }

  update_current_badge(recordID, record) {
    this.firestore.doc(this.collectionName + '/' + recordID).update(record);
  }

  update_current_badge2(recordID, record) {
    this.firestore.doc(this.collectionName + '/' + recordID).update(record);
  }
  // delete_student(record_id) {
  //   this.firestore.doc(this.collectionName + '/' + record_id).delete();
  // }

  update_current_border(recordID, record) {
    this.firestore.doc(this.collectionName + '/' + recordID).update(record);
  }

  read_claimed_badge() {
    return this.firestore.collection(this.collectionClaimed).snapshotChanges();
  }

  update_claimed_badge(recordID, record){
    this.firestore.doc(this.collectionClaimed + '/' + recordID).update(record);
  }
}
