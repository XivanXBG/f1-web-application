import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/core/services/firestore.service';
import { ICurcuit } from 'src/app/core/interfaces/circuit';

@Component({
  selector: 'app-race-countdown',
  templateUrl: './race-countdown.component.html',
  styleUrls: ['./race-countdown.component.css']
})
export class RaceCountdownComponent implements OnInit {

  constructor(private router: Router, private firestoreService: FirestoreService) { }

  circuit!: ICurcuit;
  index: string = "14";
  idFire: string;
  raceStartDate!: Date;
  countdown!: string;

  ngOnInit(): void {
    if (+this.index > 23) {
      this.index = "0";
    }
    this.fetchData();
  }

  fetchData() {
    this.firestoreService.getRaceDetailsByRound(this.index).subscribe(raceDetails => {
      raceDetails.map(docChange => {
        const circuit = docChange.payload.doc.data();
        this.idFire = docChange.payload.doc.id;
        this.raceStartDate = new Date(`${circuit.date}T${circuit.time}`);
      });

      setInterval(() => {
        this.updateCountDown();
      }, 1000);
    });
  }

  scheduleNextFetch() {
    setTimeout(() => {
      this.index = (+this.index + 1).toString(); 
      this.fetchData(); 
    }, 2 * 60 * 60 * 1000);
  }

  updateCountDown() {
    const currentTime = new Date();
    const timeRemaining = this.raceStartDate.getTime() - currentTime.getTime();

    if (timeRemaining <= 0) {
      this.countdown = "Race has started!";
      this.scheduleNextFetch();
    } else {
      const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

      this.countdown = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
    }
  }

  showRace() {
    this.router.navigate(['/schedule', 'details', this.idFire]);
  }
}
