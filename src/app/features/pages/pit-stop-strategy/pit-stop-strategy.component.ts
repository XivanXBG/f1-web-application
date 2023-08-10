import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LeaderboardItem } from 'src/app/core/interfaces/leaderboard';
import { IUser } from 'src/app/core/interfaces/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { FirestoreService } from 'src/app/core/services/firestore.service';



@Component({
  selector: 'app-pit-stop-strategy',
  templateUrl: './pit-stop-strategy.component.html',
  styleUrls: ['./pit-stop-strategy.component.css']
})
export class PitStopStrategyComponent implements OnInit {
  @ViewChild('simulationList', { read: ElementRef }) simulationList!: ElementRef;
  selectedCircuit: string = '';
  selectedLaps: number = 0;
  selectedTire: string = '';
  simulationResults: string[] = [];
  showInfo!: boolean;
  hasRaceStarted: boolean = false;
  currentTire: string = "";
  totalTime = 0;
  isDNF: boolean = false;
  leaderboard: LeaderboardItem[];
  constructor(private firestore: FirestoreService, private authService: AuthService, private afAuth: AngularFireAuth) { }

  pitStopAvailable: boolean = false;
  ngOnInit(): void {
    this.firestore.getRaceDetailsByRound("13").subscribe(raceDetails => {
      raceDetails.map(docChange => {
        const circuit = docChange.payload.doc.data();
        this.getUserInfo()
        this.loadLeaderboard()
        this.selectedCircuit = circuit.raceName;
        this.selectedLaps = circuit.laps
      }
      )
    })
  }


  selectTire(tireType: string) {
    this.selectedTire = tireType;

    if (!this.hasRaceStarted) {
      this.currentTire = this.selectedTire;
    }
  }

  hasRaceEnded: boolean = false;
  baseLapTime = 60;
  baseTireLife = 100;


  tiresInfo = {
    soft: { degradationRate: 7, lapTime: 5 },
    medium: { degradationRate: 4, lapTime: 12 },
    hard: { degradationRate: 3, lapTime: 18 }
  }
  scrollSimulationListToBottom() {
    this.simulationList.nativeElement.scrollTop = this.simulationList.nativeElement.scrollHeight;
  }

  async simulateStrategy() {

    this.totalTime = 0;

    for (let index = 0; index < this.selectedLaps; index++) {

      await this.delay(1000);

      let msg = (this.lapSimulator(index));

      if (this.simulationResults.includes('You have DNF-ed')) {
        this.hasRaceEnded = true;
        this.pitStopAvailable = false;
        this.isDNF = true;
        break;
      }
      if (msg == "No tire selected!") {

        this.simulationResults.push(msg)
        break;
      } else {
        this.hasRaceStarted = true
        this.simulationResults.push(msg);
        this.pitStopAvailable = true;
        this.scrollSimulationListToBottom();
      }
    }
    this.hasRaceEnded = true;
  }
  formatTime(totalTime: number) {
    const totalMinutes = Math.floor(totalTime / 60);
    const totalSeconds = totalTime % 60;
    return `${totalMinutes} mins ${totalSeconds} secs`;
  }
  
  degradaration(tire: string) {
    if (this.baseTireLife <= 0) {


      this.simulationResults.push("You have DNF-ed")
    }
    if (this.baseTireLife <= 25) {
      this.tiresInfo[tire].lapTime += 6;
    } else if (this.baseTireLife <= 50) {
      this.tiresInfo[tire].lapTime += 4;
    } else if (this.baseTireLife <= 75) {
      this.tiresInfo[tire].lapTime += 2;
    }
  }
  lapSimulator(lap: number) {

    let lapTime = 0;
    let formatedLapTime = '';
    switch (this.currentTire) {

      case "soft":
        lapTime = this.baseLapTime + (this.tiresInfo.soft.lapTime);
        this.totalTime += lapTime;
        formatedLapTime = this.formatTime(lapTime);
        this.baseTireLife -= this.tiresInfo.soft.degradationRate
        this.degradaration('soft');
        return `Lap ${lap + 1}, Time: ${formatedLapTime}`

      case "medium":
        lapTime = this.baseLapTime + (this.tiresInfo.medium.lapTime);
        this.totalTime += lapTime;
        formatedLapTime = this.formatTime(lapTime);
        this.baseTireLife -= this.tiresInfo.medium.degradationRate
        this.degradaration('medium');
        return `Lap ${lap + 1}, Time: ${formatedLapTime}`

      case "hard":
        lapTime = this.baseLapTime + (this.tiresInfo.hard.lapTime);
        this.totalTime += lapTime;
        formatedLapTime = this.formatTime(lapTime);
        this.baseTireLife -= this.tiresInfo.hard.degradationRate
        this.degradaration('hard');
        return `Lap ${lap + 1}, Time: ${formatedLapTime}`

      default:
        return "No tire selected!";

    }


  }

  makePitstop() {

    if (this.hasRaceStarted) {
      this.currentTire = this.selectedTire
      this.totalTime += 23;

      this.simulationResults.push(`Changed to tires: ${this.selectedTire}`);
      this.restartRace()
    } else {

      this.simulationResults.push("Race hasn't started yet!");
    }
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  user: IUser
  getUserInfo() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.authService.getUserInfo(user.uid).then((res) => {
          return this.user = res as IUser;
        });
      }
    });
  }
  loadLeaderboard() {
    this.firestore.getLeaderboard().subscribe((leaderboard: LeaderboardItem[]) => {
      // Sort the leaderboard array by converted score in seconds
      this.leaderboard = leaderboard.sort((a, b) => {
        return +a.score - +b.score
      });

      // Display only the first 5 items
      this.leaderboard = this.leaderboard.slice(0, 5);

      console.log(this.leaderboard);
    });
  }

  


  confirmRaceOutcome() {
    this.hasRaceEnded = false
    this.hasRaceStarted = false
    this.restartRace()


    this.firestore.addDocumentToLeaderboard(`${this.user.name}`, this.totalTime)
      .then((docRef) => {
        console.log('Document added with ID: ', docRef.id);
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });



  }

  restartRace() {
    this.baseTireLife = 100;
    this.tiresInfo = {
      soft: { degradationRate: 7, lapTime: 5 },
      medium: { degradationRate: 4, lapTime: 12 },
      hard: { degradationRate: 3, lapTime: 18 }
    }

  }
  resetRace() {
    this.simulationResults = [];
    this.restartRace()
    this.hasRaceEnded = false
    this.hasRaceStarted = false

  }

}
